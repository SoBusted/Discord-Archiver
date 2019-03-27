# Discord-Archiver
Bot for download attachments uploaded to discord

## Usage
1. Download this repository.
2. Write your token and archive folder path to `config.json`.
3. Open terminal and move to this repository folder.
4. Input this command line.
```
node archiver.js
```

Files will be saved in the archive folder using following structure

```
<Archive Folder>
│
├── Server 1
│   │
│   ├── channel1
│   │   ├── file1.jpg
│   │   └── file2.png
│   │
│   └── channel2
│       ├── file1.jpg
│       └── file2.png
│
└── Server 2
    │
    ├── channel1
    │   ├── file1.jpg
    │   └── file2.png
    │
    └── channel2
        ├── file1.jpg
        └── file2.png
```
