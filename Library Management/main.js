class Book {
    constructor( title , author , pages ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }

    getDetails() {
        return `${this.title} by ${this.author} - ${this.pages} pages.`;
    }
}

class Ebook extends Book {
    constructor(title, author, pages, fileSize) {
        super(title, author, pages);
        this.fileSize = fileSize;
    }

    getEbookDetails() {
        return `${this.getDetails()} Available in ebook format with a file size of ${this.fileSize}MB.`;
    }
}

const Library = [
    new Book("Neon Dreams 1", "Author Cyber", 150),
    new Ebook("Neon Dreams 2", "Author Cyber", 210, 5.2),
    new Book("Neon Dreams 3", "Author Cyber", 180),
    new Ebook("Silent Echoes", "Sarah Connor", 320, 3.8),
    new Book("The Glass Hotel", "Emily St. John", 290),
    new Ebook("Night Circus", "Erin Morgenstern", 400, 4.5),
    new Book("Dark Matter", "Blake Crouch", 340),
    new Ebook("The Midnight Library", "Matt Haig", 288, 2.1),
    new Book("Fahrenheit 451", "Ray Bradbury", 249),
    new Ebook("1984", "George Orwell", 328, 3.4),
    new Book("Brave New World", "Aldous Huxley", 268),
    new Ebook("The Road", "Cormac McCarthy", 287, 2.5),
    new Book("Dune", "Frank Herbert", 412),
    new Ebook("Neuromancer", "William Gibson", 271, 4.1),
    new Book("Snow Crash", "Neal Stephenson", 480),
    new Ebook("Altered Carbon", "Richard K. Morgan", 374, 5.5),
    new Book("Foundation", "Isaac Asimov", 255),
    new Ebook("Hyperion", "Dan Simmons", 482, 6.2),
    new Book("The Left Hand Of Darkness", "Ursula K. Le Guin", 304),
    new Ebook("Do Androids Dream Of Electric Sheep?", "Philip K. Dick", 210, 3.0),
    new Ebook("Dragon's Breath", "John Doe", 450, 4.0),
    new Book("The Hobbit", "J.R.R. Tolkien", 310),
    new Ebook("The Fellowship Of The Ring", "J.R.R. Tolkien", 423, 5.1),
    new Book("The Two Towers", "J.R.R. Tolkien", 352),
    new Ebook("The Return Of The King", "J.R.R. Tolkien", 416, 6.0),
    new Book("Harry Potter And The Sorcerer's Stone", "J.K. Rowling", 309),
    new Ebook("A Game Of Thrones", "George R.R. Martin", 694, 8.5),
    new Book("The Name Of The Wind", "Patrick Rothfuss", 662),
    new Ebook("Mistborn: The Final Empire", "Brandon Sanderson", 541, 7.2),
    new Book("The Way Of Kings", "Brandon Sanderson", 1007),
    new Ebook("American Gods", "Neil Gaiman", 465, 4.8),
    new Book("Good Omens", "Terry Pratchett & Neil Gaiman", 412),
    new Ebook("The Color Of Magic", "Terry Pratchett", 288, 3.5),
    new Book("Guards! Guards!", "Terry Pratchett", 416),
    new Ebook("The Lies Of Locke Lamora", "Scott Lynch", 499, 5.0),
    new Book("The Blade Itself", "Joe Abercrombie", 536),
    new Ebook("Assassin's Apprentice", "Robin Hobb", 435, 4.4),
    new Book("The Eye Of The World", "Robert Jordan", 814),
    new Ebook("The Golden Compass", "Philip Pullman", 399, 3.9),
    new Book("Jonathan Strange & Mr Norrell", "Susanna Clarke", 1006),
    new Book("The Silent Patient", "Alex Michaelides", 325),
    new Ebook("Gone Girl", "Gillian Flynn", 415, 4.2),
    new Book("The Girl With The Dragon Tattoo", "Stieg Larsson", 465),
    new Ebook("And Then There Were None", "Agatha Christie", 264, 2.8),
    new Book("The Hound Of The Baskervilles", "Arthur Conan Doyle", 256),
    new Ebook("In The Woods", "Tana French", 429, 4.6),
    new Book("Big Little Lies", "Liane Moriarty", 460),
    new Ebook("The Da Vinci Code", "Dan Brown", 489, 5.1),
    new Book("Angels & Demons", "Dan Brown", 713),
    new Ebook("Sharp Objects", "Gillian Flynn", 254, 3.1),
    new Book("The Cuckoo's Calling", "Robert Galbraith", 455),
    new Ebook("The Snowman", "Jo Nesbø", 383, 3.8),
    new Book("The Girl On The Train", "Paula Hawkins", 316),
    new Ebook("Defending Jacob", "William Landay", 421, 4.3),
    new Book("Presumed Innocent", "Scott Turow", 431),
    new Ebook("The Alienist", "Caleb Carr", 498, 5.0),
    new Book("Rebecca", "Daphne Du Maurier", 416),
    new Ebook("The Sweetness At The Bottom Of The Pie", "Alan Bradley", 374, 3.7),
    new Book("The Thirteenth Tale", "Diane Setterfield", 406),
    new Ebook("A Study In Scarlet", "Arthur Conan Doyle", 123, 1.5),
    new Ebook("The Martian", "Andy Weir", 369, 3.9),
    new Book("Project Hail Mary", "Andy Weir", 496),
    new Ebook("Ender's Game", "Orson Scott Card", 324, 3.5),
    new Book("Leviathan Wakes", "James S.A. Corey", 561),
    new Ebook("The Three-Body Problem", "Cixin Liu", 399, 4.1),
    new Book("Children Of Time", "Adrian Tchaikovsky", 600),
    new Ebook("Red Rising", "Pierce Brown", 382, 3.8),
    new Book("The Hitchhiker's Guide To The Galaxy", "Douglas Adams", 193),
    new Ebook("I, Robot", "Isaac Asimov", 224, 2.4),
    new Book("Jurassic Park", "Michael Crichton", 399),
    new Ebook("Contact", "Carl Sagan", 430, 4.5),
    new Book("The Time Machine", "H.G. Wells", 118),
    new Ebook("The War Of The Worlds", "H.G. Wells", 192, 2.1),
    new Book("Starship Troopers", "Robert A. Heinlein", 264),
    new Ebook("Ringworld", "Larry Niven", 288, 3.0),
    new Book("Rendezvous With Rama", "Arthur C. Clarke", 243),
    new Ebook("2001: A Space Odyssey", "Arthur C. Clarke", 297, 3.2),
    new Book("Solaris", "Stanisław Lem", 204),
    new Ebook("Ancillary Justice", "Ann Leckie", 386, 4.0),
    new Book("Old Man's War", "John Scalzi", 318),
    new Book("Sapiens: A Brief History Of Humankind", "Yuval Noah Harari", 443),
    new Ebook("Guns, Germs, And Steel", "Jared Diamond", 425, 5.5),
    new Book("A People's History Of The United States", "Howard Zinn", 729),
    new Ebook("The Diary Of A Young Girl", "Anne Frank", 283, 3.0),
    new Book("SPQR: A History Of Ancient Rome", "Mary Beard", 606),
    new Ebook("The Rise And Fall Of The Third Reich", "William L. Shirer", 1249, 9.5),
    new Book("The Guns Of August", "Barbara W. Tuchman", 511),
    new Ebook("Team Of Rivals", "Doris Kearns Goodwin", 916, 7.8),
    new Book("1776", "David McCullough", 386),
    new Ebook("John Adams", "David McCullough", 751, 6.5),
    new Book("Alexander Hamilton", "Ron Chernow", 818),
    new Ebook("The Wright Brothers", "David McCullough", 320, 3.5),
    new Book("Band Of Brothers", "Stephen E. Ambrose", 336),
    new Ebook("Unbroken", "Laura Hillenbrand", 473, 4.8),
    new Book("Devil In The White City", "Erik Larson", 447),
    new Ebook("The Splendid And The Vile", "Erik Larson", 546, 5.8),
    new Book("Dead Wake", "Erik Larson", 430),
    new Ebook("In The Heart Of The Sea", "Nathaniel Philbrick", 302, 3.2),
    new Book("Bury My Heart At Wounded Knee", "Dee Brown", 487),
    new Ebook("A World Undone", "G.J. Meyer", 704, 7.2)
];

const parentSections = document.querySelector('.LibrarySections');
const totalSize = document.getElementById('book-size');

Library.forEach( book => {
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book';
    bookDiv.textContent = book instanceof Ebook ? book.getEbookDetails() : book.getDetails();

    const button = document.createElement('button');
    button.textContent = 'ابدأ القراءة';
    bookDiv.appendChild(button);

    parentSections.appendChild(bookDiv);
});

const totalFileSize = Library.reduce( ( acc , curr ) => {
    return curr instanceof Ebook ? acc + curr.fileSize : acc;
} , 0);

totalSize.textContent = totalFileSize;