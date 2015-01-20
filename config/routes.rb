B1Admin::Engine.routes.draw do
	root to: "admin#index"
  get "logout" => "sessions#destroy", as: "logout"
  get "login" => "sessions#new", as: "login"
  post "login" => "sessions#create", as: "sign_in"

end
