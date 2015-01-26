B1Admin::Engine.routes.draw do
	root to: "admin#index"
  get "logout",  to: "sessions#destroy"
  get "login",   to: "sessions#new"
  post "login",  to: "sessions#create"
  post "restore",to: "sessions#restore"
  
  get "profile", to: "user#profile"
  get "messages",to: "user#messages"

  namespace :settings do
  	resources :modules
    namespace :modules do 
      post "update_positions"
    end
  	resources :roles
  	resources :permissions
  	resources :admins
  end

  namespace :logs do 
  	resources :systems
  end

end
