chrome.alarms.create('CLOCK', { delayInMinutes: 0, periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener(() => {
  const date = new Date();
  const displayClockText = getDisplayClockText(date);
  const imageData = createCurrentTimeImage(displayClockText);
  chrome.action.setIcon({imageData: imageData});
});

/**
 * 引数の日時情報を元にhh:mm形式のテキストを返却する
 * 
 * @param {Date} date 
 */
const getDisplayClockText = (date) => {
  const hour = `0${date.getHours()}`.slice(-2); // 前0を付与する
  const min = `0${date.getMinutes()}`.slice(-2); // 前0を付与する
  const displayClockText = `${hour}:${min}`;
  return displayClockText;
}

/**
 * 引数のテキストを表示する16×16のimageを返却する
 * 
 * @param {String} displayTextTop 表示するテキスト
 */
const createCurrentTimeImage = (displayText) => {
  const canvas = new OffscreenCanvas(22, 22);
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, 22, 22);
  context.fillStyle = '#1967d2';
  context.font = '1pt';
  context.fillText(displayText, 0, 16);
  const imageData = context.getImageData(0, 0, 22, 22);
  return imageData;
}