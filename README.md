# Discord-Archiver
Bot for download attachments uploaded to discord

## Usage
1. Download this repository.
2. Write your token and archive folder path to `config.json`. (I recommend you to use this bot as a selfbot)
3. Open terminal and move to this repository folder.
4. Input this command line.
```
node archiver.js
```

Files will be saved in the archive folder using following structure

```
<Archive Folder>
│
├── DM
│   │
│   ├── User1
│   │   │
│   │   ├── 2019-03-27
│   │   │   ├── file1.jpg
│   │   │   └── file2.png
│   │   │
│   │   └── 2019-03-28
│   │       ├── file1.jpg
│   │       └── file2.png
│   │
│   └── User2
│       │
│       ├── 2019-03-27
│       │   ├── file1.jpg
│       │   └── file2.png
│       │
│       └── 2019-03-28
│           ├── file1.jpg
│           └── file2.png
│
├── Server1
│   │
│   ├── Channel1
│   │   │
│   │   ├── 2019-03-27
│   │   │   ├── file1.jpg
│   │   │   └── file2.png
│   │   │
│   │   └── 2019-03-28
│   │       ├── file1.jpg
│   │       └── file2.png
│   └── Channel2
│       │
│       ├── 2019-03-27
│       │   ├── file1.jpg
│       │   └── file2.png
│       │
│       └── 2019-03-28
│           ├── file1.jpg
│           └── file2.png
│
└── Server2
    │
    ├── Channel1
    │   │
    │   ├── 2019-03-27
    │   │   ├── file1.jpg
    │   │   └── file2.png
    │   │
    │   └── 2019-03-28
    │       ├── file1.jpg
    │       └── file2.png
    └── Channel2
        │
        ├── 2019-03-27
        │   ├── file1.jpg
        │   └── file2.png
        │
        └── 2019-03-28
            ├── file1.jpg
            └── file2.png
```
