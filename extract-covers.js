import { parseFile } from 'music-metadata';
import * as fs from 'fs';
import * as path from 'path';

const musicDir = path.resolve('public/music');
const coversDir = path.resolve('public/music/covers');

if (!fs.existsSync(coversDir)) {
  fs.mkdirSync(coversDir, { recursive: true });
}

// Map of song titles to cover filenames
const songCoverMap = {};

async function extractCovers() {
  const files = fs.readdirSync(musicDir);
  console.log(`Found ${files.length} items in music directory.`);

  for (const file of files) {
    if (!file.endsWith('.mp3')) continue;
    const filePath = path.join(musicDir, file);
    try {
      const metadata = await parseFile(filePath);
      const picture = metadata.common.picture && metadata.common.picture[0];
      
      if (picture) {
        // Create a safe name for the cover image
        const safeName = file.replace('.mp3', '')
          .replace(/[^a-zA-Z0-9-_]/g, '_')
          .toLowerCase();
        
        let ext = '.jpg';
        if (picture.format === 'image/png') ext = '.png';
        if (picture.format === 'image/webp') ext = '.webp';
        
        const coverFilename = `${safeName}${ext}`;
        const coverPath = path.join(coversDir, coverFilename);
        
        fs.writeFileSync(coverPath, picture.data);
        console.log(`Successfully extracted cover for: "${file}" -> "${coverFilename}"`);
        songCoverMap[file] = `/music/covers/${coverFilename}`;
      } else {
        console.log(`No cover found in metadata for: "${file}"`);
      }
    } catch (err) {
      console.error(`Error parsing "${file}":`, err.message);
    }
  }

  // Now, let's update songs.js with the correct cover paths
  updateSongsJS();
}

function updateSongsJS() {
  const songsJsPath = path.resolve('src/data/songs.js');
  if (!fs.existsSync(songsJsPath)) {
    console.error('songs.js not found at', songsJsPath);
    return;
  }

  let content = fs.readFileSync(songsJsPath, 'utf8');

  // Read current song entries from songs.js and replace the covers
  // We can do this programmatically or load the array and rewrite it.
  // Since we already have the songs list, let's parse the file dynamically or replace paths.
  // Let's do a replace based on the actual audio filename matching the keys in songCoverMap.
  // If there's no extracted cover, we can fall back to a default, or keep the existing placeholder.
  
  // Let's import the songs array to update it cleanly.
  // Actually, let's rewrite the songs.js array with updated covers.
  
  const originalSongs = [
    {
      id: 1,
      title: "Ae Mere Wattan Ke Logo",
      artist: "Lata Mangeshkar",
      category: "Desh Bhakti",
      year: "1963",
      cover: "/music/cover-1.jpg",
      audio: "/music/Lata Mangeshkar - Ae Mere Wattan Ke Logo.mp3",
    },
    {
      id: 2,
      title: "Maa Tujhe Salaam",
      artist: "A.R. Rahman",
      category: "Desh Bhakti",
      year: "1997",
      cover: "/music/cover-2.jpg",
      audio: "/music/A.R. Rahman - Maa Tujhe Salaam.mp3",
    },
    {
      id: 3,
      title: "Revival (Vande Mataram)",
      artist: "A.R. Rahman",
      category: "Desh Bhakti",
      year: "1997",
      cover: "/music/cover-3.jpg",
      audio: "/music/A.R. Rahman - Revival (Vande Mataram).mp3",
    },
    {
      id: 4,
      title: "Sandese Aate Hain",
      artist: "Sonu Nigam, Roop Kumar Rathod",
      category: "Desh Bhakti",
      year: "1997",
      cover: "/music/cover-4.jpg",
      audio: "/music/Sonu Nigam, Roop Kumar Rathod - Sandese Aate Hai-Ke Ghar Kab Aaoge - From 'Border'.mp3",
    },
    {
      id: 5,
      title: "Rang De Basanti",
      artist: "A.R. Rahman, Daler Mehndi",
      category: "Desh Bhakti",
      year: "2006",
      cover: "/music/cover-5.jpg",
      audio: "/music/A.R. Rahman, Daler Mehndi, K. S. Chithra - Rang De Basanti.mp3",
    },
    {
      id: 6,
      title: "Mera Rang De Basanti",
      artist: "A.R. Rahman, Sonu Nigam",
      category: "Desh Bhakti",
      year: "2006",
      cover: "/music/cover-6.jpg",
      audio: "/music/A.R. Rahman, Sonu Nigam, Manmohan Waris, Sameer Anjaan - Mera Rang De Basanti.mp3",
    },
    {
      id: 7,
      title: "Yeh Jo Des Hai Tera",
      artist: "A.R. Rahman",
      category: "Desh Bhakti",
      year: "2001",
      cover: "/music/cover-7.jpg",
      audio: "/music/A.R. Rahman - Yeh Jo Des Hai Tera.mp3",
    },
    {
      id: 8,
      title: "Bharat Humko Jaan Se Pyara Hai",
      artist: "A.R. Rahman, Hariharan",
      category: "Desh Bhakti",
      year: "1997",
      cover: "/music/cover-8.jpg",
      audio: "/music/A.R. Rahman, Hariharan - Bharat Humko Jaan Se Pyara Hai.mp3",
    },
    {
      id: 9,
      title: "Sarfaroshi Ki Tamanna",
      artist: "A.R. Rahman, Sonu Nigam",
      category: "Desh Bhakti",
      year: "2002",
      cover: "/music/cover-1.jpg",
      audio: "/music/A.R. Rahman, Sonu Nigam, Hariharan, Sameer Anjaan - Sarfaroshi Ki Tamanna - Sad Version.mp3",
    },
    {
      id: 10,
      title: "Jagaao Mere Des Ko",
      artist: "A.R. Rahman, Suchi, Blaaze",
      category: "Desh Bhakti",
      year: "2010",
      cover: "/music/cover-2.jpg",
      audio: "/music/A.R. Rahman, Suchi, Blaaze - Jagaao Mere Des Ko.mp3",
    },
    {
      id: 11,
      title: "Aazadi",
      artist: "A.R. Rahman",
      category: "Desh Bhakti",
      year: "2005",
      cover: "/music/cover-3.jpg",
      audio: "/music/A.R. Rahman - Aazadi (From \"Bose The Forgotten Hero\").mp3",
    },
    {
      id: 12,
      title: "O Mere Desh Ki Mati",
      artist: "Indrajit Das Gupta",
      category: "Desh Bhakti",
      year: "1954",
      cover: "/music/cover-4.jpg",
      audio: "/music/Indrajit Das Gupta - O Mere Desh Ki Mati.mp3",
    },
    {
      id: 13,
      title: "Mere Desh Ki Dharti",
      artist: "Mahendra Kapoor",
      category: "Desh Bhakti",
      year: "1967",
      cover: "/music/cover-5.jpg",
      audio: "/music/Mahendra Kapoor, Kalyanji-Anandji - Mere Desh Ki Dharti.mp3",
    },
    {
      id: 14,
      title: "Aisa Des Hai Mera",
      artist: "Lata Mangeshkar, Udit Narayan",
      category: "Desh Bhakti",
      year: "2004",
      cover: "/music/cover-6.jpg",
      audio: "/music/Madan Mohan, Lata Mangeshkar, Udit Narayan, Gurdas Maan, Pritha Mazumdar, Javed Akhtar - Aisa Des Hai Mera.mp3",
    },
    {
      id: 15,
      title: "Desh ki Mitti",
      artist: "Sonu Nigam, Anuradha Sriram",
      category: "Desh Bhakti",
      year: "2023",
      cover: "/music/cover-7.jpg",
      audio: "/music/Sonu Nigam, Anuradha Sriram, Javed Akhtar - Desh ki Mitti.mp3",
    },
    {
      id: 16,
      title: "Bande Mein Tha Dum",
      artist: "Sonu Nigam, Shreya Ghoshal",
      category: "Desh Bhakti",
      year: "2009",
      cover: "/music/cover-8.jpg",
      audio: "/music/Sonu Nigam, Shreya Ghoshal, Pranab Biswas - Bande Mein Tha Dum Vande Mataram.mp3",
    },
    {
      id: 17,
      title: "Vande Mataram",
      artist: "Tiger Shroff, Vishal Mishra",
      category: "Desh Bhakti",
      year: "2022",
      cover: "/music/cover-1.jpg",
      audio: "/music/Tiger Shroff, Vishal Mishra - Vande Mataram.mp3",
    },
    {
      id: 18,
      title: "Vandematram",
      artist: "Sukhwinder Singh, Anupriya Chatterjee",
      category: "Desh Bhakti",
      year: "2019",
      cover: "/music/cover-2.jpg",
      audio: "/music/Sukhwinder Singh, Anupriya Chatterjee, Sunjoy Bose - Vandematram (From '72 Hours').mp3",
    },
    {
      id: 19,
      title: "Watna Ve",
      artist: "Sukhwinder Singh",
      category: "Desh Bhakti",
      year: "2022",
      cover: "/music/cover-3.jpg",
      audio: "/music/Sukhwinder Singh - Watna Ve.mp3",
    },
    {
      id: 20,
      title: "Tujhe Namaami Ho",
      artist: "Shreya Ghoshal, Sunidhi Chauhan, KK",
      category: "Desh Bhakti",
      year: "2004",
      cover: "/music/cover-4.jpg",
      audio: "/music/Shreya Ghoshal, Sunidhi Chauhan, KK, Rana Mazumder - Tujhe Namaami Ho.mp3",
    },
    {
      id: 21,
      title: "Kadam Kadam",
      artist: "Vijay Prakash, Mumbai Film Choir",
      category: "Desh Bhakti",
      year: "2010",
      cover: "/music/cover-5.jpg",
      audio: "/music/Vijay Prakash, Mumbai Film Choir, Javed Akhtar - Kadam Kadam.mp3",
    },
    {
      id: 22,
      title: "Jaihind Ki Senaa",
      artist: "Vikram Montrose",
      category: "Desh Bhakti",
      year: "2021",
      cover: "/music/cover-6.jpg",
      audio: "/music/Vikram Montrose - Jaihind Ki Senaa (From 'Shershaah').mp3",
    },
    {
      id: 23,
      title: "Hum Honge Kamyaab",
      artist: "Mohit Lalwani, Bharat Kamal",
      category: "Desh Bhakti",
      year: "2020",
      cover: "/music/cover-7.jpg",
      audio: "/music/Mohit Lalwani, Bharat Kamal, Aditi Banerjee - Hum Honge Kamyaab.mp3",
    },
    {
      id: 24,
      title: "Nanha Munna Rahi Hoon",
      artist: "Shanti Mathur",
      category: "Desh Bhakti",
      year: "1954",
      cover: "/music/cover-8.jpg",
      audio: "/music/Shanti Mathur - Nanha Munna Rahi Hoon.mp3",
    },
  ];

  const updatedSongs = originalSongs.map((song) => {
    // extract filename from path
    const audioFilename = song.audio.replace('/music/', '');
    if (songCoverMap[audioFilename]) {
      return {
        ...song,
        cover: songCoverMap[audioFilename]
      };
    }
    return song;
  });

  const newContent = `export const songs = ${JSON.stringify(updatedSongs, null, 2)};\n`;
  fs.writeFileSync(songsJsPath, newContent, 'utf8');
  console.log('Successfully updated songs.js with the extracted cover art paths.');
}

extractCovers();
