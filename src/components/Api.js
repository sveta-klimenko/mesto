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
    return fetch(this.url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(handleResponse);
  }

  deleteCard(data) {
    return fetch(this.url, {
      method: "DELETE",
      headers: this.headers,
      body: JSON.stringify(data),
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
}
