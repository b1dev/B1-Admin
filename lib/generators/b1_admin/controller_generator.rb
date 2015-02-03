module B1Admin
  module Generators
    class ControllerGenerator < Rails::Generators::Base
      include Thor::Actions
      source_root File.expand_path('../templates', __FILE__)
      desc "This generator create  B1 Admin controller"

      argument :module_namespace, optional: false, type: :string, banner:"Namespace of module e.g. 'content' "
      argument :name, optional: false, type: :string, banner:"Name of module 'faq' "

      #check_class_collision suffix: "Controller"
      
      def create_dirs
        FileUtils::mkdir_p "app/controllers/b1_admin/"
        FileUtils::mkdir_p "app/controllers/b1_admin/#{module_namespace}/"
      end

      def create
        template "controller.rb.erb", "app/controllers/b1_admin/#{module_namespace}/#{name}_controller.rb"
        route <<-R
          namespace :#{module_namespace} do 
            resources :#{name}
          end
        R

      end


    end
  end
end