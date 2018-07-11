'use strict';

(function () {
  var COMMENTS = [
    'Все отлично!',
    'В целом все не плохо, но не все.',
    'Когда вы делайте фотографию, хорошо бы убирать палец из кадра. В конце концов это не профессионально!',
    'Моя бабушка случайно чихнула с фотоаппартом в руках и у нее получилось лучше',
    'Я подскользнулся на бананновой кожуре и уронил фотоаппарт на кота и у меня фотография получилась лучше',
    'Лица у людей на фото перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?'
  ];

  var getRandomNumber = function (min, max) {

    return Math.floor(Math.random() * (max - min) + min);
  };

  var getComments = function () {
    var arrComment = [];
    if (getRandomNumber(1, 2) === 1) {
      arrComment[0] = COMMENTS[getRandomNumber(0, 5)];
      return arrComment;
    } else {
      arrComment[0] = getRandomNumber(0, 5);
      arrComment[1] = getRandomNumber(0, 5);
      return arrComment;
    }
  };

  var randomSort = function (lengthArr) {
    var arr = [];
    for (var i = 1; i <= lengthArr; i++) {
      arr[i] = i;
    }
    var compareRandom = function (a, b) {
      return Math.random() - 0.5;
    }

    return arr.sort(compareRandom);
  };

  window.data = {
    arrOriginal: [],
    getPictures: function () {
      var picturesArr = [];
      var urlArr = randomSort(25);

      for (var i = 0; i < 25; i++) {
        picturesArr[i] = {
          url: 'photos/' + urlArr[i] + '.jpg',
          likes: getRandomNumber(15, 200),
          comments: getComments()
        };
      }
      return picturesArr;
    }
  };
})()