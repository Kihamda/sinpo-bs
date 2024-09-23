# 電子式進歩記録帳

このソフトウェアは Firebase hosting にデプロイすることを前提に作っています。

## GitHub 関係

- `github\workflows\main.yaml`に GitHub Action 用の色々が入っています。
- 実際にデプロイするときは開発環境で`npm install firebase-tools`をちゃんと入れて`firebase init`するほうがいいと思います

## Firestore 関連

各コレクションごとに`firebase\template\{コレクション名}.json`がテンプレートとして用意されています

- 凡例

  - [コレクション名]
  - {可変部分の説明}
  - "ドキュメント名"
  - レコードのキー：データ
  - ；説明

- データ構造

  - ```
    [scouts]                                  ；各スカウトに関する情報を格納
        - "{ id (random) }"                   ；各スカウトの識別子
        |   - [took]                          ；取得した技能賞
        |   |   - "{id (random) }"            ；各取得した技能賞ごとの識別子
        |   |   |   - kind                    ；-取得した技能賞の種類（参照）
        |   |   |   - date                    ；-技能賞を取得した日付
        |   |   |   - examiner                ；-考査員の名前
        |   |   |   - comment                 ；-技能賞取得にあたってのコメント
        |   |
        |   |   - 沢山・・・
        |   |
        |   - [history]                       ；各隊の経歴
        |   |   - "bvs"：                     ；どの隊についてか
        |   |   |   - joined: yyyy/mm/dd,     ；上進日時
        |   |   |   - exited: yyyy/mm/dd,     ；
        |   |
        |   |   - cs
        |   |   - bs
        |   |   - vs
        |   |   - rs
        |   |
        |   - [event]
        |   |   - declare

    [settings]
      - { uid }
        |   - name : 佐藤花子
        |


    [shares]
      - { id (random) }
        - < ref > (scouts/{ id })
    ```

```

```
