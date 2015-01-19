module B1Admin
  module Generators
		class InstallGenerator < Rails::Generators::Base
		  source_root File.expand_path('../templates', __FILE__)
		  desc "This generator install B1 Admin"

		  argument :admin_namescape, optional: false, type: :string, banner:"admin_namescape"

		  def init_routes # :nodoc:
		  	route "mount B1Admin::Engine => \"/#{admin_namescape}\""
		  end

		end
  end
end