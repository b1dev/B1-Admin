B1Admin::Engine.routes.draw do
	root to: "admin#index"
  get "logout" => "sessions#destroy", as: "logout"
  get "login" => "sessions#new", as: "login"
  resources :sessions, only: [:new, :create, :destroy]
end
