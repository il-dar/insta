class CommentsController < ApplicationController
  before_action :define_post

  def show

  end

  def index

  end

  def new

  end

  def create

    @comment = @post.comments.build(comment_params)
    @comment.user_id = current_user.id

    if @comment.save
      redirect_to root_path
    else
       flash[:alert] = "Comment could not be saved"
       redirect_to root_path
    end

  end

  def edit

  end

  def destroy
    @comment = @post.comment.find(params[:id])

    @comment.destroy
    redirect_to root_path
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end

  def define_post

    @post = Post.find(params[:post_id])

  end

end
