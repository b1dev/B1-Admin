module B1Admin
  class Exception < StandardError
    def initialize code,args={}
      super I18n.t("b1_admin.errors.e_#{code}",args)
      #B1Admin::Logger.log(self.message)
    end
  end
end