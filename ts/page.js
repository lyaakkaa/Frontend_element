function goToPage() {
    history.go();
}
// class Page {
//     private pageId: string;
//     route: string;
//     constructor(pageId: string, route: string) {
//         this.pageId = pageId;
//         this.route = route;
//     }
// }
var Page = /** @class */ (function () {
    function Page(pageId, route) {
        this.pageId = pageId;
        this.route = route;
    }
    return Page;
}());
var page = new Page('1', 'home');
