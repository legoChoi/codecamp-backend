import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  async upload({ files }) {
    const waitedFiles = await Promise.all(files);

    //
    // 구글 스토리지에 파일 업로드

    const storage = new Storage({
      projectId: 'codecamp-backend-379606', // 프로젝트 아이디
      keyFilename: 'gcp-file-storage.json', // 키 파일
    }).bucket('choi-codecamp-storage'); // 폴더 명

    //
    // map()을 활용
    // [file, file] -> [Promise, Promise]
    const results = await Promise.all(
      waitedFiles.map((el) => {
        return new Promise((resolve, reject) => {
          el.createReadStream()
            .pipe(storage.file(el.filename).createWriteStream())
            .on('finish', () => resolve(`choi-codecamp-storage/${el.filename}`))
            .on('error', () => reject('실패'));
        });
      }),
    ); // result == ['폴더명/파일명', '폴더명/파일명']

    //
    // 파일 URL 반환

    return results;
  }
}
