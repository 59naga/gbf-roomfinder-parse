import { XmlEntities } from 'html-entities';

const entities = new XmlEntities();

// マッチした文字列を返す。なければ初期値
function extract(str, regexp, defaultValue = '', targetIndex = 1) {
  const matched = str.match(regexp) || [];
  return matched[targetIndex] || defaultValue;
}

function extractRaid(tweet = '') {
  const lines = tweet.split('\n').slice();
  lines.splice(1, 1);
  const nextLine = () => lines.shift() || '';

  const id = extract(nextLine(), /^(\w+)(?: :Room ID|：ルームID)$/);
  // '募集対象：誰でもOK' -> '誰でもOK'
  // '誰でもOK' or 'Anyone' -> ''
  const only = nextLine().replace(/^募集対象(:・目的)?：/, '').replace(/^(誰でもOK|Anyone)$/, '');
  const readyCheck = !extract(nextLine(), /^(Ready Check Disabled|承認なし)/, false);
  const max = extract(nextLine(), /^(?:Limit: |参戦人数：)(\d+)( players|人)/, 30) | 0;
  const over = extract(nextLine(), /^(?:Rank: |Rank )(\d+)(\+| 以上)/, 0) | 0;

  const optionalLine = lines[0] || '';
  const repeat = extract(optionalLine, /^(?:Repeating Quest: |連続クエスト設定：)(\d+)( times|回連続)/, 0) | 0;
  if (repeat) {
    nextLine();
  }
  const title = entities.decode(lines.join('\n'));

  return {
    type: 'raid',
    id,
    only,
    readyCheck,
    max,
    over,
    repeat,
    title,
  };
}

function extractCoop(tweet = '') {
  const lines = tweet.split('\n').slice();
  lines.splice(1, 1);
  const nextLine = () => lines.shift() || '';

  const id = extract(nextLine(), /^(\w+)(?: :Room ID|：ルームID)$/);
  const only = nextLine().replace(/^募集対象・目的：/, '').replace(/^(誰でもOK|Anyone)$/, '');
  const over = extract(nextLine(), /^(?:Rank: |Rank )(\d+)( or Higher| 以上)/, 0) | 0;
  const title = entities.decode(lines.join('\n'));

  return {
    type: 'coop',
    id,
    only,
    over,
    title,
  };
}

// ツイートからルーム情報を抽出する
function extractRoomData(tweet = '') {
  if (tweet.match(/(マルチバトル参加者募集！|Join my Granblue Fantasy raid room!)/)) {
    return extractRaid(tweet);
  }
  return extractCoop(tweet);
}

const entries = extractRoomData;
entries.extract = extract;
entries.extractRaid = extractRaid;
entries.extractCoop = extractCoop;
export default entries;
