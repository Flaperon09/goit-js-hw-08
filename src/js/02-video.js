import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

// Переменная для локального хранилища
const KEY_TIME = "videoplayer-current-time";

// Функция сохранение времени воспроизведения
const onPlay = function (event) {
  localStorage.setItem(KEY_TIME, event.seconds);
};

// Установка периода сохранения времени видео в 1 секунду
player.on("timeupdate", throttle(onPlay, 1000));

// Установка начального времени воспроизведения
player.setCurrentTime(JSON.parse(localStorage.getItem(KEY_TIME)) || 0);