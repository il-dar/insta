Rails.application.routes.draw do
  devise_for :users, :controllers => { registrations: 'registrations' }
  root to: 'posts#index'

  resources :posts do
    resources :comments
  end

  match 'like', to: 'likes#like', via: :post
  
  match 'unlike', to: 'likes#unlike', via: :delete

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
