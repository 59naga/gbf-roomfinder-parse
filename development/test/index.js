// dependencies
import assert from 'assert';

// target
import parse from '../src';
import tweets from './fixtures.json';

// specs
it('空文字はデフォルト値を返すべき', () => {
  assert.deepStrictEqual(parse(''), { type: 'coop', id: '', only: '', over: 0, title: '' });
});
it('日本語版、英語版に関わらず、ツイート文字列を適切なオブジェクトに変換するべき', () => {
  const expected = [
    { type: 'raid', id: 'DD33B0', only: '', readyCheck: true, max: 30, over: 0, repeat: 0, title: '' },
    { type: 'raid', id: '1DB93E', only: 'フレンド限定', readyCheck: false, max: 18, over: 140, repeat: 0, title: 'Room Title (｀・∀・´)' },
    { type: 'raid', id: '63ACF2', only: '', readyCheck: false, max: 30, over: 0, repeat: 15, title: "<\"' &>\n改\n行" },
    { type: 'raid', id: 'DD33B0', only: '', readyCheck: true, max: 30, over: 0, repeat: 0, title: '' },

    { type: 'raid', id: 'DD33B0', only: '', readyCheck: true, max: 30, over: 0, repeat: 0, title: '' },
    { type: 'raid', id: '1DB93E', only: 'Friends Only', readyCheck: false, max: 18, over: 140, repeat: 0, title: 'Room Title (｀・∀・´)' },
    { type: 'raid', id: '63ACF2', only: '', readyCheck: false, max: 30, over: 0, repeat: 15, title: "<\"' &>\n改\n行" },

    { type: 'coop', id: 'B0D90', only: '', over: 0, title: '' },
    { type: 'coop', id: '2548A', only: '', over: 80, title: 'Room Title (｀・∀・´)' },
    { type: 'coop', id: 'FC68F', only: 'ドロップ狙い', over: 0, title: "<\"' &>\n改\n行" },
    { type: 'coop', id: 'B0D90', only: '', over: 0, title: '' },

    { type: 'coop', id: 'B0D90', only: '', over: 0, title: '' },
    { type: 'coop', id: '2548A', only: '', over: 80, title: 'Room Title (｀・∀・´)' },
    { type: 'coop', id: 'FC68F', only: 'Item Hunting', over: 0, title: "<\"' &>\n改\n行" },
  ];
  assert(tweets.length === expected.length);
  expected.forEach((right, i) => {
    const tweet = tweets[i];
    assert.deepStrictEqual(parse(tweet), right);
  });
});
