:package: `gbf-roomfinder-parse`
---
<p align="right">
  <a href="https://npmjs.org/package/gbf-roomfinder-parse">
    <img src="https://img.shields.io/npm/v/gbf-roomfinder-parse.svg?style=flat-square">
  </a>
  <a href="https://travis-ci.org/59naga/gbf-roomfinder-parse">
    <img src="http://img.shields.io/travis/59naga/gbf-roomfinder-parse.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/59naga/gbf-roomfinder-parse/coverage">
    <img src="https://img.shields.io/codeclimate/github/59naga/gbf-roomfinder-parse.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/59naga/gbf-roomfinder-parse">
    <img src="https://img.shields.io/codeclimate/coverage/github/59naga/gbf-roomfinder-parse.svg?style=flat-square">
  </a>
  <a href="https://gemnasium.com/59naga/gbf-roomfinder-parse">
    <img src="https://img.shields.io/gemnasium/59naga/gbf-roomfinder-parse.svg?style=flat-square">
  </a>
</p>

共闘救援ツイートのオブジェクト変換関数

:inbox_tray: Installation
---
```bash
npm install gbf-roomfinder-parse --save
```

:bulb: Motivation
---
[gbf-roomfinder](https://github.com/59naga/gbf-roomfinder)の特に行数の多かった部分を外部ライブラリ化し、メンテナンスを容易にするため。

:scroll: API
---

```js
import parse from 'gbf-roomfinder-parse'
```

## `parse(str)` -> `roomData`

`str`をツイートとして、含まれる部屋情報を抽出してオブジェクトを返します。

ツイート内に「マルチバトル参加者募集！」もしくは「Join my Granblue Fantasy raid room!」をふくむ場合、マルチバトル部屋として以下のキーを持つオブジェクトを返します。

* `type` 値は`raid`固定です
* `id` 部屋id。6桁の文字列。デフォルト`''`
* `only` 募集対象。「誰でもOK!」の場合、空文字`''`を返します。デフォルト`''`
* `readyCheck` バトル開始承認。デフォルト`true`
* `max` 参戦人数。デフォルト`30`
* `over` 募集ランク。デフォルト`0`
* `repeat` 連続クエスト設定。デフォルト`0`
* `title` コメント。募集リストに表示される部屋名です。デフォルト`''`

```js
parse("［グラブル］マルチバトル参加者募集！\nルームID：930EBC\n募集対象：誰でもOK\n承認なし\n参戦人数：6人\nRank 140 以上\nプロメテhlお手伝いお願いします(｀・∀・´)")
// => { type: 'raid', id: '930EBC', only: '', readyCheck: false, max: 6, over: 140, repeat: 0, title: 'プロメテhlお手伝いお願いします(｀・∀・´)' }

parse("Join my Granblue Fantasy raid room!\nRoom ID: 556707\nAnyone\nReady Check Disabled\nLimit: 30 players\nRank: 101+\nBaha baha")
// => { type: 'raid', id: '556707', only: '', readyCheck: false, max: 30, over: 101, repeat: 0, title: 'Baha baha' }
```

マルチバトル部屋でない場合、それは共闘クエスト部屋として以下のキーを持つオブジェクトを返します。

* `type` 値は`coop`固定です
* `id` 部屋id。6桁の文字列。デフォルト`''`
* `only` 募集対象。「誰でもOK!」の場合、空文字`''`を返します。デフォルト`''`
* `over` 募集ランク。デフォルト`0`
* `title` コメント。募集リストに表示される部屋名です。デフォルト`''`

```js
parse("[グラブル]共闘クエスト参加者募集！\nルームID：DA456\n募集対象・目的：誰でもOK\nRank制限なし\nスラ爆時間貼り15分貼り！理解者のみ")
// => { type: 'coop', id: 'DA456', only: '', over: 0, title: 'スラ爆時間貼り15分貼り！理解者のみ' }

parse("Join my Granblue Fantasy co-op room!\nRoom ID: 6B0E3\nPandemonium\nNo Min. Rank\nキマイラ周回\nニルヴァーナレプリカ出るまで")
// => { type: 'coop', id: '6B0E3', only: 'Pandemonium', over: 0, title: 'キマイラ周回\nニルヴァーナレプリカ出るまで' },
```

引数が空文字だったり、値が正しく読み取れなかったとき、それぞれのデフォルト値を使用します。

```js
parse('')
// => { type: 'coop', id: '', only: '', over: 0, title: '' }
```

`title`は、その性質上、ツイート時に投稿者が内容を書き加えることが多くあるため、留意してください。（「あと２人です！」など、現状を追記するなど）

:wrench: Development
---
Requirement global
* NodeJS v8.2.1
* Npm v5.3.0 (or [pnpm](https://github.com/rstacruz/pnpm))

```bash
git clone https://github.com/59naga/gbf-roomfinder-parse
cd gbf-roomfinder-parse/development
npm install

npm test
```

<br><br>
<p align="right">
  <a href="http://59naga.mit-license.org/">
    MIT License :clipboard:
  </a>
</p>
