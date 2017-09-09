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
    { type: 'raid', id: 'B64E5C', only: '', readyCheck: true, max: 30, over: 0, repeat: 0, title: '' },
    { type: 'raid', id: '930EBC', only: '', readyCheck: false, max: 6, over: 140, repeat: 0, title: 'プロメテhlお手伝いお願いします(｀・∀・´)' },
    { type: 'raid', id: '9ABF97', only: '', readyCheck: true, max: 6, over: 140, repeat: 6, title: 'ギルガメ６連' },
    { type: 'raid', id: 'DC17D4', only: '', readyCheck: true, max: 18, over: 120, repeat: 0, title: 'つよばは 要職or 火力 凸ルシあり 今5人！頼む！！' },
    // 改ざんされたツイートには対応しない。「募集対象:」はオリジナルでなく、原文は「募集対象：」となる
    { type: 'raid', id: '610052', only: '募集対象:lv130', readyCheck: true, max: 18, over: 130, repeat: 0, title: '邂逅hl，help！' },
    { type: 'raid', id: '556707', only: '', readyCheck: false, max: 30, over: 101, repeat: 0, title: 'Baha baha' },
    { type: 'raid', id: '44DA54', only: '', readyCheck: true, max: 6, over: 150, repeat: 0, title: 'アバハ hl' },
    { type: 'raid', id: '94132B', only: '', readyCheck: true, max: 6, over: 101, repeat: 0, title: '' },
    { type: 'raid', id: '291D06', only: '', readyCheck: true, max: 30, over: 0, repeat: 30, title: '改\n行' },
    { type: 'raid', id: '2321EF', only: '', readyCheck: true, max: 30, over: 0, repeat: 0, title: " <>&\"'" },

    { type: 'coop', id: 'DA456', only: '', over: 0, title: 'スラ爆時間貼り15分貼り！理解者のみ' },
    { type: 'coop', id: '', only: 'もりくん爆発', over: 90, title: '' },
    { type: 'coop', id: 'A0D2D', only: '', over: 0, title: 'スラ爆　順張り　遅くない方' },
    { type: 'coop', id: '9BF7A', only: 'ドロップ狙い', over: 90, title: '幻魔の間 何回かやる' },
    { type: 'coop', id: 'C4DA7', only: '誰でもOkこうですか？わかりません＞＜', over: 0, title: 'N-1 N-2 あたりをためしにまわりたいのです' },
    { type: 'coop', id: '3EEF3', only: 'デイリーミッション', over: 0, title: '5戦' },
    { type: 'coop', id: 'BF478', only: '募集対象・パンデモ攻略します', over: 90, title: '' },
    { type: 'coop', id: '282EB', only: 'デイリーミッション', over: 0, title: 'どなたかデイリー消化付き合ってくだされ～' },

    { type: 'coop', id: '84BBA', only: '', over: 0, title: '' },
    { type: 'coop', id: '602EC', only: 'Item Hunting', over: 80, title: 'Diablo' },
    { type: 'coop', id: 'C932C', only: '', over: 0, title: 'hard completion help' },
    { type: 'coop', id: 'C932C', only: '', over: 0, title: 'hard completion help' },
    { type: 'coop', id: '6B0E3', only: 'Pandemonium', over: 0, title: 'キマイラ周回\nニルヴァーナレプリカ出るまで' },
    { type: 'coop', id: 'B1E6B', only: 'Anyone pls-&gt;doing rule of the twilight for unlock samurai', over: 0, title: '' },
    { type: 'coop', id: 'EDF5A', only: '', over: 90, title: 'EX2 1-4 .Thanks_(:з」∠)_' },
    { type: 'coop', id: '8477B', only: '', over: 0, title: 'Ex 2 - 3 [Ifrit]' },
  ];
  assert(tweets.length === expected.length);
  expected.forEach((right, i) => {
    const tweet = tweets[i];
    assert.deepStrictEqual(parse(tweet), right);
  });
});
