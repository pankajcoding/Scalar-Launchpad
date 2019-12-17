(function () {
    const input = document.querySelector('.comment-input')
    const btn = document.querySelector('button')
    comments = []

    btn.addEventListener("click", (e) => {
        i = comments.length
        text = input.value;
        input.value=''
        comments.push({
            id: i,
            user: "Siddharth",
            text: text,
            time: getTime(),
            likes: 0
        })
        html = comments.map((comment) => {
            return `
            <div class="comment comment-${comment.id}" >
                <div class="user">
                    ${comment.user}
                </div>
                <div class="comment-text">
                        ${comment.text}
                </div>
                <br>
                <div class="comment-response">
                    <a data-id="${comment.id}" href="" class="like" id="like">
                        Like
                    </a>
                    <a href="" class="Reply">
                        Reply
                    </a>
                    <div class="time">
                        ${comment.time}
                    </div>
                    <div class="totallikes">
                    &#128077;
                <span class="like-amount">
                    ${comment.likes?
                        `  
                        ${comment.likes}
                    `:
                        ``
                    }
                    </span>
                </div>
                </div>
            </div>
            `;
        }).join('')

        document.querySelector('.comments-wrapper').innerHTML=html
        
        
    });


    document.addEventListener('click',function(e){
        e.preventDefault()
        if(e.target && e.target.id== 'like'){
              console.log(e.target.id);
              id=e.target.dataset.id
              likes= ++(comments[id].likes)
              console.log(likes);
              c=document.querySelector(`.comment-${id} .totallikes span`)
              c.innerHTML=likes
              console.log(c);

         }
     });

    function getTime(){
        d=new Date()
        h=d.getHours(); 
        m=d.getMinutes(); 
        s=d.getSeconds(); 
        return `${h}:${m}:${s}`
    }


})()