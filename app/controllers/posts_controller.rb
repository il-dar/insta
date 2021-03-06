class PostsController < ApplicationController
before_action :authenticate_user!
before_action :users_post, only: [:update, :edit, :destroy]
skip_before_action :verify_authenticity_token

def index
  @posts = Post.all
end

def new
  @post = current_user.posts.build
end


def create
  @post = current_user.posts.build(post_params)
  if @post.save
     respond_to do |format|
       format.html {redirect_to posts_path}
       format.js
     end
   else
     flash[:alert] = "Your new post couldn't be created!  Please check the form."
     render :new
   end
end

def show
  @post = Post.find(params[:id])
end

def edit
  @post = Post.find(params[:id])
end

def update
  @post = Post.find(params[:id])
  @post.update(post_params)
  redirect_to(post_path(@post))
end

def destroy
  @post = Post.find(params[:id])
  @post.destroy
  redirect_to posts_path
end

private




  def post_params
    params.require(:post).permit(:image, :caption)
  end

  def users_post
    @post = Post.find(params[:id])
    unless current_user == @post.user
      flash[:error] = "Cannot access this page!"
      redirect_to root_path
    end
  end

end
