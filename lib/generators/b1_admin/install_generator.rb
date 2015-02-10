module B1Admin
  module Generators
		class InstallGenerator < Rails::Generators::Base
		  source_root File.expand_path('../templates', __FILE__)
		  desc "This generator install B1 Admin"

		  argument :admin_namescape, optional: false, type: :string, banner:"admin_namescape"

      def copy_config
        generate "b1_config:install"
        template 'admin_config.yml.erb', "config/configs/admin.yml"
        gem "haml-rails"
        gem "b1_config"
        gem "paperclip"

      end

		  def init_routes # :nodoc:
		  	route "mount B1Admin::Engine => \"/#{admin_namescape}\""
		  end

		  def init_seeds # :nodoc:
				inject_into_file 'db/seeds.rb',"B1Admin::Engine.load_seed\n", before: File.open('db/seeds.rb', &:gets) 
		  end

		  def rake_the_app # :nodoc:
		  	rake "db:migrate"
		  	rake "db:seed"
		  end

      def create_logs_config_file
      	template 'mongoid.yml', File.join('config', "mongoid.yml") , collision: :skip
      end



      def init_assets
        # FileUtils::mkdir_p "app/assets/javascripts/b1_admin/"
        # FileUtils::mkdir_p "app/assets/stylesheets/b1_admin/"
        # create_file "app/assets/javascripts/b1_admin/"
      end

		end
  end
end