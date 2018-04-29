class CommentsController < ApplicationController
  before_action :define_post
  skip_before_action :verify_authenticity_token

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
      respond_to do |format|
       format.html
       format.json
      end
    else
       flash[:alert] = "Comment could not be saved"
       redirect_to root_path
    end

  end

  def edit

  end

  def destroy
    @comment = @post.comments.find(params[:id])

    if @comment.user_id == current_user.id
      @comment.delete
      respond_to do |format|
        format.html { redirect_to root_path }
        format.js
      end
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end

  def define_post

    @post = Post.find(params[:post_id])

  end

end
