


// 検索(#send)ボタンがクリックされたときの処理
$("#send").on("click", function() {
    // 検索結果を表示するための要素を空にする
    $(".result").empty();
    // 入力キーワード
    const key = document.getElementById("key").value;

    if (key === "") {
        alert("キーワードを入力してください");
        return;
    }

    const url = "https://www.googleapis.com/books/v1/volumes?q=" + key;
    const result = document.querySelector(".result");
    $.ajax({
        url: url,
        dataType: "json",
        context: document.body
      }).done(function(data) {
            console.log(data);
            let len = data.items.length; // 検索結果の件数

            // 検索結果の表示
            let html = "";

            for (let i = 0; i < len; i++) {
                html += `
                <div class="item-box">
                    <div class="img-box">
                        <img src="${data.items[i].volumeInfo.imageLinks.thumbnail}" alt="表紙画像">
                    </div>
                    <div class="right-box">
                        <p class="title">
                        <a href="${data.items[i].volumeInfo.infoLink}" target="_blank">
                        ${data.items[i].volumeInfo.title}
                        </a>
                        </p>
                        <div class="title-box">
                            ${data.items[i].volumeInfo.authors ? `<p class="author">著：${data.items[i].volumeInfo.authors}</p>` : ''}
                            ${data.items[i].volumeInfo.publishedDate ? `<p class="date">出版日：${data.items[i].volumeInfo.publishedDate}</p>` : ''}
                        </div>
                        <p class="description">${data.items[i].volumeInfo.description ? data.items[i].volumeInfo.description : '説明はありません。'}</p>
                    </div> 
                </div>    
                `;
            }
            $(".result").append(html);
            console.log("append完了");
      });
})
