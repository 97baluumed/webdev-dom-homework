import { renderComments } from "./modules/renderComments.js";
import { comments } from "./modules/comments.js";

renderComments();

const commentsList = document.querySelector('.comments');
const addButton = document.querySelector('.add-form-button');
const nameInput = document.querySelector('.add-form-name');
const commentInput = document.querySelector('.add-form-text');
let originalNameColor = nameInput.style.backgroundColor;
let originalCommentColor = commentInput.style.backgroundColor;
const sanitizeHtml = (value) => {
      return value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

addButton.addEventListener('click', () => {

      if (nameInput.value === "") {
        nameInput.style.backgroundColor = "red";
        setTimeout(() => {
          nameInput.style.backgroundColor = originalNameColor;
        }, 2000);
        return;
      } else if (commentInput.value === "") {
        commentInput.style.backgroundColor = "red";
        setTimeout(() => {
          commentInput.style.backgroundColor = originalCommentColor;
        }, 2000);
        return;
      }
      const trimmedName = nameInput.value.trim();
      const trimmedComment = commentInput.value.trim();

      if (trimmedName === "") {
        nameInput.style.backgroundColor = "red";
        setTimeout(() => {
          nameInput.style.backgroundColor = originalNameColor;
        }, 2000);
        return;
      } else if (trimmedComment === "") {
        commentInput.style.backgroundColor = "red";
        setTimeout(() => {
          commentInput.style.backgroundColor = originalCommentColor;
        }, 2000);
        return;
      }
      const name = trimmedName;
      const commentText = trimmedComment;
      
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString('ru-RU', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
      });

      comments.push({
        name: sanitizeHtml(name),
        comment: sanitizeHtml(commentText),
        date: formattedDate,
        quantityLikes: 0,
        likes: false
      });

      const newComment = `
          <li class="comment">
            <div class="comment-header">
              <div>${name}</div>
              <div>${formattedDate}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text">
                ${commentText}
              </div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">0</span>
                <button class="like-button"></button>
              </div>
            </div>
          </li>
        `;

    
      commentsList.innerHTML += newComment;
      nameInput.value = '';
      commentInput.value = '';
      renderComments();
});