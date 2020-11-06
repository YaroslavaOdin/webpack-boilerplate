export default class Post {
    constructor(title, img) {
        this.title;
        this.img = img;
        this.date = new Date()
    }

    toString() {
        return JSON.stringify({
            title: this.title,
            img: this.img,
            date: this.date.toJSON()
        })
    }

    get uppercaseTitle() {
        return this.title.toUpperCase();
    }
}