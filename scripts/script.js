class Albums {
  URL_ALL_ALBUMS = `https://jsonplaceholder.typicode.com/albums`;
  URL_ALL_PHOTOS = `https://jsonplaceholder.typicode.com/photos`;

  async requestData(url, nameStorage) {
    let response = await fetch(url);
    response = await response.json();
    localStorage.setItem(nameStorage, JSON.stringify(response));
    return response;
  }

  createAlbumList(array) {
    const ul = document.getElementById(`all-albums`);

    for (const elem of array) {
      const li = document.createElement(`li`);
      li.append(JSON.stringify(elem));
      ul.append(li);
    }

    document.body.append(ul);
  }

  getPhotoListItem() {
    const listItems = document.querySelectorAll(`#all-albums>li`);

    listItems.forEach((item, index) => {
      item.setAttribute(`id`, ++index);

      item.addEventListener(`click`, (e) => {
        const allPhotosFromStorage = JSON.parse(
          localStorage.getItem(`allPhotosStorage`)
        );

        const imagesBlock = document.createElement(`div`);
        imagesBlock.classList.add(`images`);

        for (const elem of allPhotosFromStorage) {
          const img = document.createElement(`img`);

          if (Number(e.target.id) === elem.albumId) {
            img.src = elem.thumbnailUrl;
            imagesBlock.append(img);
            document.body.append(imagesBlock);
            document.body.querySelector(`#all-albums`).innerHTML = ``;
          }

          img.addEventListener(`click`, () => {
            const bigImg = document.createElement(`img`);
            bigImg.classList.add(`bigImage`);
            bigImg.src = elem.url;
            document.body.append(bigImg);
            imagesBlock.innerHTML = ``;
          });
        }
      });
    });
  }

  getData() {
    this.requestData(this.URL_ALL_ALBUMS, (this.nameStorage = `dataStorage`))
      .then((response) => {
        this.createAlbumList(response);
      })
      .then(() => {
        this.requestData(
          this.URL_ALL_PHOTOS,
          (this.nameStorage = `allPhotosStorage`)
        );
      })
      .then(() => {
        this.getPhotoListItem();
      });
  }
}

const data = new Albums();
data.getData();
