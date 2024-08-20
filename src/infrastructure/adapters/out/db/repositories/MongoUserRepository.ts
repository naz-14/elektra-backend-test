import { IUserRepository } from "../../../../../application/ports/out/IUserRepository";
import { User } from "../../../../../domain/entities/User";
import { UserModel } from "../models/UserModel";

export class UserRepository implements IUserRepository {
  async findAll(): Promise<User[]> {
    try {
      const userDocs = await UserModel.find();
      return userDocs.map((userDoc) => {
        const { _id, ...user } = userDoc.toObject();
        return { ...user, id: _id.toString() } as User;
      });
    } catch (error) {
      throw error;
    }
  }

  async findByUserName(userName: string): Promise<User | null> {
    try {
      const userDoc = await UserModel.findOne({ userName });
      if (!userDoc) return null;

      const { _id, ...user } = userDoc.toObject();
      return { ...user, id: _id.toString() } as User;
    } catch (error) {
      throw error;
    }
  }

  async findByPhone(phone: string): Promise<User | null> {
    try {
      const userDoc = await UserModel.findOne({ phoneNumber: phone });
      if (!userDoc) return null;

      const { _id, ...user } = userDoc.toObject();
      return { ...user, id: _id.toString() } as User;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const userDoc = await UserModel.findById(id);
      if (!userDoc) return null;

      const { _id, ...user } = userDoc.toObject();
      return { ...user, id: _id.toString() } as User;
    } catch (error) {
      throw error;
    }
  }

  async save(user: User): Promise<User> {
    try {
      const userDoc = new UserModel(user);
      await userDoc.save();

      const { _id, ...savedUser } = userDoc.toObject();
      return { ...savedUser, id: _id.toString() } as User;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async saveToken(userId: string, token: string): Promise<void> {
    await UserModel.updateOne({ _id: userId }, { $set: { token } });
  }
}
