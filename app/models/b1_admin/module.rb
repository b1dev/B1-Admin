module B1Admin
  class Module < ActiveRecord::Base
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
      raise B1Admin::Exception(4) if self.parent_module.nil?
      "b1_admin/#{self.parent_module.controller}/#{self.controller}_controller".camelize.constantize.instance_methods(false)
    end
  end
end
