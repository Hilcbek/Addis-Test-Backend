import httpStatus from 'http-status';
import APIError from '../../error/APIError.js';
import { modelNames } from '../../utils/constants.js';

export async function createMusic() {
  try {
    let { mname } = this;
    const isMuiscExist = await this.model(modelNames.music)
      .findOne({ mname })
      .exec();
    if (isMuiscExist) {
      throw new APIError(`A music already exist!`, httpStatus.CONFLICT, true);
    }
    const user = await this.save();
    return user;
  } catch (error) {
    if (error instanceof APIError) throw error;
    else {
      throw new APIError(
        'Internal server error ',
        httpStatus.INTERNAL_SERVER_ERROR,
        false
      );
    }
  }
}
export async function fetchAllMusic(search) {
  try {
    if (search !== '' && search) {
      let fetchedResult = await this.model(modelNames.music).aggregate([
        {
          $match: {
            mname: {
              $regex: search,
              $options: 'i',
            },
          },
        },
        {
          $sort: {
            mname: 1,
          },
        },
      ]);
      return fetchedResult;
    }
    const musics = await this.model(modelNames.music).find({});
    return musics;
  } catch (error) {
    if (error instanceof APIError) {
      throw new APIError(
        'unalbe to fetch all musics',
        httpStatus.INTERNAL_SERVER_ERROR,
        true
      );
    }
  }
}
const fetchSingleMusic = async (id) => {
  return await this.model(modelNames.music).findById(id);
};
export async function updateMusic(id, data) {
  try {
    const singleMusic = fetchSingleMusic.bind(id, this);

    const musics = await this.model(modelNames.music).findByIdAndUpdate(
      id,
      {
        $set: {
          mname: data.mname || singleMusic.mname,
          desc: data.desc || singleMusic.desc,
          genere: data.genere || singleMusic.genere,
        },
      },
      { new: true }
    );
    return musics;
  } catch (error) {
    if (error instanceof APIError) {
      throw new APIError(
        'unalbe to fetch all musics',
        httpStatus.INTERNAL_SERVER_ERROR,
        true
      );
    }
  }
}
export async function deleteMusic(id) {
  try {
    await this.model(modelNames.music).findByIdAndDelete(id);
    return 'music delete successfully';
  } catch (error) {
    if (error instanceof APIError) {
      throw new APIError(
        'unalbe to fetch all musics',
        httpStatus.INTERNAL_SERVER_ERROR,
        true
      );
    }
  }
}
