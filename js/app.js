/*getElementsByClassName IE8+ support Code */
if (!document.getElementsByClassName) {
    document.getElementsByClassName = function (className) {
        return this.querySelectorAll("." + className);
    };
    Element.prototype.getElementsByClassName = document.getElementsByClassName;
}


/* Data Store */
var cardArr = new Array();
var card = function (tit, status) {
    this.title = tit,
    this.status = status

};
/*  Parent Object*/
var App = {
    /*Initialistaion*/
    init: function () {
        /*Event handlers*/
        var lintags = document.getElementsByTagName('a');
        var newCards = document.getElementsByClassName('add-card');
        var editCards = document.getElementsByClassName('edit-card');
        var deleteCards = document.getElementsByClassName('delete-card');
        var draggables = document.getElementsByClassName('list-card');
        var droppables = document.getElementsByClassName('list-card-area');
        console.log(editCards.length);
        for (var i = 0; i < newCards.length; i++) {


            newCards[i].addEventListener("click", App.addCard, false);
        };
        for (var j = 0; j < editCards.length; j++) {


            editCards[j].addEventListener("click", App.editCard, false);
        };
        for (var k = 0; k < deleteCards.length; k++) {


            deleteCards[k].addEventListener("click", App.deleteCard, false);
        }
        for (var l = 0; l < draggables.length; l++) {


            draggables[l].ondragstart = function (event) {
                App.drag(event);
            };
        };
        for (var m = 0; m < droppables.length; m++) {


            droppables[m].ondragover = function (event) {
                App.dragover(event);
            }
            droppables[m].ondrop = function (event) {
                App.drop(event);
            }
        };
        for (var n = 0; n < lintags.length; n++) {

            lintags[n].onclick = function (event) {
                App.preventNav(event)
            }

        };

        App.getElement('addList').addEventListener("click", App.addNewList, false);
    },
    /*Add a new task*/
    addCard: function () {
        var cardStatus = this.getAttribute("status");

        var prev = this.previousElementSibling;
        prev.style.display = "block";

        var walker = document.createTreeWalker(prev, NodeFilter.SHOW_ELEMENT, null, false);

        var node = walker.nextNode();


        while (node !== null) {
            console.log('while count');


            if (node.className == 'save-card') {


                node.onclick = function () {

                    var nodval = '',
                        nClone = '',
                        newWalker = '';
                    nodval = this.previousElementSibling.value.trim();
                    this.previousElementSibling.value = '';
                    prev.style.display = "none";
                    if (nodval == '') return;

                    cardArr.push(new card(nodval, cardStatus));

                    newWalker = document.createTreeWalker(prev.previousElementSibling, NodeFilter.SHOW_ELEMENT, null, false);
                    nClone = newWalker.firstChild().cloneNode(true);
                    prev.previousElementSibling.appendChild(nClone); //list-card-title 
                    newWalker.parentNode();
                    newWalker.lastChild();
                    nClone.style.display = 'block';
                    newWalker.firstChild().innerHTML = nodval;
                    App.init();

                };
            }
            if (node.className == 'cancel-card') {
                node.addEventListener("click", function () {

                    prev.style.display = "none";
                }, false);
            }
            node = walker.nextNode();
        }


    },
    /*Edit an existing task*/
    editCard: function () {
        console.log('insideedit');
        var curDesc = this.parentNode.previousElementSibling;

        App.getElement('popover').style.display = 'block';
        App.getElement("pop-card-desc").innerHTML = curDesc.innerHTML;
        App.getElement("save-updated").onclick = function () {
            cardArr.filter(function (item, index, array) {

                if (item.title == curDesc.innerHTML) {
                    item.title = App.getElement("updated-desc").value;

                }

            });
            curDesc.innerHTML = App.getElement("updated-desc").value;
            App.getElement("updated-desc").value = '';
            App.getElement('popover').style.display = 'none';
            console.log(cardArr);


        }
        App.getElement("cancel-updated").onclick = function () {
            App.getElement('popover').style.display = 'none';

        }

    },
    /*Delete a task*/
    deleteCard: function () {
        var curDesc = this.parentNode.previousElementSibling;
        cardArr.filter(function (item, index, array) {

            if (item.title == curDesc.innerHTML) {
                array.splice(index, 1);
            }

        });
        var parCont = this.parentNode.parentNode.parentNode;
        var childCont = this.parentNode.parentNode;
        parCont.removeChild(childCont);
        console.log(cardArr);
    },

    getElement: function (id) {
        var ele = document.getElementById(id);
        return ele;

    },
    /*Add new List*/
    addNewList: function () {

        if (App.getElement('listText').value != '') {
            var newListName = App.getElement('listText').value;
            var newListCont = document.getElementsByClassName('list')[0].cloneNode(true);

            listWalker = document.createTreeWalker(newListCont, NodeFilter.SHOW_ELEMENT, null, false);
            listWalker.firstChild();
            listWalker.firstChild();
            console.log(newListName);
            listWalker.firstChild().innerHTML = newListName;
            listWalker.parentNode();
            listWalker.parentNode();
            listWalker.parentNode();
            listWalker.lastChild().setAttribute("status", newListName);
            App.getElement('main-container').appendChild(newListCont);
            newListCont.style.display = "block";
            App.getElement('listText').value = '';
            App.init();
        }
    },
    /*Drag funcionality*/
    drag: function (ev) {
        console.log('on drag');
        console.log(ev.target.cloneNode(true));
        ev.target.setAttribute("id", "tobetransfered");
        console.log(ev.target.id);
        ev.dataTransfer.setData("Text", ev.target.id);
    },
    /*Prevent default action for drag elements*/
    dragover: function (ev) {
        ev.preventDefault();

    },
    /*Drop functionality*/
    drop: function (ev) {

        ev.preventDefault();
        var data = ev.dataTransfer.getData("Text");

        var curList = ev.target.parentNode.lastChild.previousSibling.getAttribute("status");

        var dragTitle = App.getElement(data).firstChild.nextSibling.innerHTML;

        cardArr.filter(function (item, index, array) {

            if (item.title == dragTitle) {
                item.status = curList;
            }

        });

        ev.target.appendChild(App.getElement(data));
        App.getElement(data).setAttribute("id", "");

    },

    preventNav: function (ev) {

        ev.preventDefault();
    }

};




/*Document Onload*/
document.addEventListener("DOMContentLoaded", function () {
    App.init();


}, false);