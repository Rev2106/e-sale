Rails.application.routes.draw do

  root to: "api/v1/products#index"

  namespace :api do
    namespace :v1 do
      resources :products do
        resources :comments, only: [:create, :index]
      end
      resources :users, only: [:create] do
        collection do
          get :get_current_user
        end
      end
      post '/signin', to: 'sessions#create'
      delete '/signout', to: 'sessions#destroy', as: 'session'
    end
  end

  get '*path', to: 'api/v1/products#index'
  

  #get 'users/new', to: 'users#new', as: 'new_user'


  # get '/products', to: 'products#index'
  # get '/products/new', to: 'products#new', as: 'new_product'
  # get "/products/:id", to: 'products#show', as: "product"
  # post '/products', to: 'products#create'
  # get '/products/:id/edit', to: 'products#edit', as: 'edit_product'
  # patch '/products/:id', to: 'products#update'
  # delete '/products/:id', to: 'products#destroy'



  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
