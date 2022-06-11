const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export default class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  getCards() {
    return fetch(this.url + "cards", {
      headers: this.headers,
    }).then(handleResponse);
  }

  createCard(data) {
    return fetch(this.url + "cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(handleResponse);
  }

  deleteCard(id) {
    return fetch(this.url + "cards/" + id, {
      method: "DELETE",
      headers: this.headers,
    }).then(handleResponse);
  }

  getPersonalInfo() {
    return fetch(this.url + "users/me", {
      headers: this.headers,
    }).then(handleResponse);
  }

  updatePersonalInfo(data) {
    return fetch(this.url + "users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(handleResponse);
  }

  updateAvatar(data) {
    return fetch(this.url + "users/me/avatar ", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(handleResponse);
  }

  likeCard(id) {
    return fetch(this.url + "cards/" + id + "/likes", {
      method: "PUT",
      headers: this.headers,
    }).then(handleResponse);
  }

  dislikeCard(id) {
    return fetch(this.url + "cards/" + id + "/likes", {
      method: "DELETE",
      headers: this.headers,
    }).then(handleResponse);
  }
}
