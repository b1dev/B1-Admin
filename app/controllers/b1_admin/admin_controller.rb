require_dependency "b1_admin/application_controller"

module B1Admin
  class AdminController < ApplicationController
  	def index
  		
  	end

  	def login
  		render layout: "b1_admin/login"
  	end
  end
end
