import { comments } from "./comments.js";
import {initLikeComments, initCommentsListener} from "./initListeners.js";

const commentsList = document.querySelector('.comments');

export const renderComments = () => {
      const commentsHtml = comments.map((comment, index) => {
        return `
          <li class="comment">
              <div class="comment-header">
                <div>${comment.name}</div>
                  <div>${comment.date || new Date().toLocaleString('ru-RU', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</div>
                </div>
              <div class="comment-body">
                <div class="comment-text">
                  ${comment.comment}
                </div>
              </div>
              <div class="comment-footer">
                <div class="likes">
                  <span class="likes-counter" data-index="${index}">${comment.quantityLikes}</span>
                  <button class="like-button" data-index="${index}"></button>
                </div>
              </div>
          </li>
        `;
      }).join('');

      commentsList.innerHTML = commentsHtml;
      initLikeComments();
      initCommentsListener();
};