module B1Admin
  class User < ActiveRecord::Base
    COOKIE_NAME = :admin_token
    has_secure_password
    includes :roles,:modules
    signinable expiration: B1Config.get_const.sign_in_expiration

    #Validates
    validates :name,:email,:phone, presence: true
    validates :password, presence: true, on: :create
    validates :name,     length: { in: 5..50 }, format: {with:/\A^[^0-9`!@#\$%\^&*+_=]+\z/i}
    validates :email,    length: { in: 6..50 }, uniqueness: true,format:{with:/\A^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i}
    validates :password, length: { in: 5..20 }, on: :create
    validates :phone,    length: { in: 6..20 }, numericality:true
    validates :active, inclusion:{ in: [true,false] }
    #End validates

    #Relations
    has_and_belongs_to_many :roles
    from_mysql_has_many  :logs, foreign_key: :user_id , class: B1Admin::Log
    #End Relations
    

    has_attached_file :avatar, styles: { medium: "300x300>",thumb: "100x100>" }, default_url: "/assets/b1_admin/avatar-missing.png"
    
    validates_attachment_file_name :avatar, :matches => [/png\Z/, /jpe?g\Z/, /gif\Z/]
    # Check if current user has access to requested action
		# @param  [String] Requested class
		# @param  [String] Requested action in class
		# @retrun [Boolean] 
    def has_access? cls,action
       has_access = true
       cls.each{|c| has_access = false unless all_user_modules.map(&:controller).include?(c)} 
       if has_access
         mod =  all_user_modules.select{|m| m.controller == cls.last}.first
         has_access = self.permissions.select{|p| p.admin_module_id == mod.id}.map(&:action).include?(action)
       end
       has_access
    end

    # Check if current user has a role by role name
		# @param  [String] Role name
		# @retrun [Boolean] 
    def has_role?(type)
      self.roles.include?(B1Admin::Role.find_by_name(type)) 
    end

    # Check if current user has access to admin module
		# @param  [B1Admin::Module] Admin module that need to check
		# @retrun [Boolean] 
    def can_access_to_module? mod
      all_user_modules.include?(mod)
    end

    # Return all availible for user parent modules without their childs
		# @retrun [Array<B1Admin::Module>]
    def modules
      self.roles.map(&:parent_modules).flatten
    end
    
    # Return all availible permission for user
    # @retrun [Array<B1Admin::Permission>]
    def permissions
      self.roles.map(&:permissions).flatten
    end


    #TODO
    def can? method_name, controller_name
      true
    end


    # Authenticate current user by password, block user if wrong password auth attempts greather of maximum
    # @note That method use gem "signinable"
    # @see https://github.com/novozhenets/signinable
		# @param  [String] User password
		# @param  [String] Current  user IP address
		# @param  [String] Requested action in class
		# @param  [String] User Agent e.g "Mozilla 12.05"
		# @retrun [Nil] 
    def sign_in(password, ip, referer, user_agent)
      if authenticate(password)
        update!(blocked: false, blocked_until: nil, wrong_password_attempts: 0)
        Rails.cache.delete("#{self.id}_modules")
        Rails.cache.delete("#{self.id}_all_modules")
        signin(ip, user_agent, referer)
      else
        increment!(:wrong_password_attempts)
        if wrong_password_attempts >= B1Config.get_const.max_password_attempts
          update!(blocked: true, blocked_until: Time.now + B1Config.get_const.block_time)
        end
        nil
      end
    end

    #TODO
    def unread_messages_count
      3
    end
    #TODO
    def messages
      []
    end

    #TODO
    def messages_count
      3
    end

    private
    # Return all availible for user parent modules and their childs
		# @retrun [Array<B1Admin::Module>]
    def all_user_modules
      @all_user_modules ||= self.roles.map(&:modules).flatten.uniq
    end
  end
end
