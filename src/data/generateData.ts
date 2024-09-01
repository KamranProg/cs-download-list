import * as fs from 'fs';
import path from 'path';


interface FileData {
  id: number;
  name: string;
  device: string;
  path: string;
  status: 'scheduled' | 'available';
}

// Function to generate mock data
function generateData(): { files: FileData[] } {
    let files: FileData[] = [];
    for (let i = 1; i <= 200; i++) {
        files.push({
            id: i,
            name: `xyz_${i}.exe`,
            device: `Device_${i % 3 + 1}`, // Cycle through Device_1, Device_2, Device_3
            path: `\\device\\path\\file_${i}.exe`,
            status: i % 2 === 0 ? "scheduled" : "available"
        });
    }
    return { files };
}

// Generate the data
const data = generateData();

// Write the data to db.json
const dbFilePath = path.join('.', 'src', 'data', 'db.json');

fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf-8');

console.log('Data generated and saved to db.json');
