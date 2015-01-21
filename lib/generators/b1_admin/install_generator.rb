module B1Admin
  module Generators
		class InstallGenerator < Rails::Generators::Base
		  source_root File.expand_path('../templates', __FILE__)
		  desc "This generator install B1 Admin"

		  argument :admin_namescape, optional: false, type: :string, banner:"admin_namescape"

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

		end
  end
end