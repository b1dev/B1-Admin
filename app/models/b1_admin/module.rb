module B1Admin
  class Module < ActiveRecord::Base

    # Set default ordering
    default_scope { order('position ASC') }

    includes :permissions, :parent_module
    #Relations
    has_and_belongs_to_many :roles
    has_many :modules, class_name:B1Admin::Module, foreign_key:"parent_id", dependent: :restrict_with_exception
    belongs_to :parent_module, class_name:B1Admin::Module, foreign_key:"parent_id"
    has_many :permissions
    #End Relations

    #Validates
    validates :ico,:controller, presence: true
    validates :ico,        length: { in: 5..20 },format: {with:/\A^[^0-9`!@#\$%\^&*+=]+\z/i}
    B1Admin::LANGS.each do |l|
    	validates :"name_#{l}", length: { in: 3..20},format: {with:/\A^[^0-9`!@#\$%\^&*+=]+\z/i}, presence: true, on:[:update]
  	end
    validates :controller, length: { in: 3..50},format: {with:/\A^[^`!@#\$%\^&*+=]+\z/i}
    #End validates

    # Return all module child modules
		# @retrun [Array<B1Admin::Module>]
    def child_modules
      Rails.cache.fetch "module_#{self.id}_modules" do 
        self.modules
      end
    end
    
    # Return all module child modules
    # @raise [B1Admin::Exception] if current module don't have parent module
		# @retrun [Array<String>]
    def methods
      raise B1Admin::Exception.new(4) if self.parent_module.nil?
      "b1_admin/#{self.parent_module.controller}/#{self.controller}_controller".camelize.constantize.instance_methods(false)
    end

    # Return localized name
    # @retrun [String]
    def name
      read_attribute "name_#{I18n.locale}"
    end

    # Check if current model is enabled
    # @param  [String] current controller name
    # @raise  [B1Admin::Exception] if param is incorrect
    # @retrun [Boolean]
    def is_active? name
      names = name.split("/").reject{|item| self.class.to_s.split("::").first.underscore == item}
      raise B1Admin::Exception.new(5,{name:"name",param: name.to_s}) unless names.any?
      names.map{|i| i.to_s.downcase}.include?(self.controller.downcase)
    end

    # Get actions of associate controller with current module
    # @raise  [B1Admin::Exception] if module is parent
    # @retrun [Array<Symbol>]
    def get_controller_actions
      raise B1Admin::Exception.new(8,{name:self.name}) if  0 == self.parent_id
      "B1Admin::#{self.parent_module.controller.capitalize}::#{self.controller.capitalize}Controller".constantize.instance_methods(false)
    end

    # Build tree of modules 
    # @retrun [Array<Hash>] modules tree
    def self.to_tree
      to_tree_recoursive = lambda do |mod| 
        {
          name: mod.name,
          id: mod.id,
          childs: mod.modules.map{ |mod| to_tree_recoursive.call(mod) }
        }
      end
      B1Admin::Module.where(parent_id:0).map{ |mod| to_tree_recoursive.call(mod) }
    end

    # Build tree of modules and their permissions
    # @retrun [Array<Hash>] modules and permissions tree
    def self.to_permission_tree
      to_tree_recoursive = lambda do |mod| 
        {
          name: mod.name,
          id: mod.id,
          permissions: mod.permissions.map(&:to_item),
          childs: mod.modules.map{ |mod| to_tree_recoursive.call(mod) }
        }
      end
      B1Admin::Module.where(parent_id:0).map{ |mod| to_tree_recoursive.call(mod) }
    end

  end
end
