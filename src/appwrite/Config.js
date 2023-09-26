import envConfig from "../Config/envConfig";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){  
        this.client
        .setEndpoint(envConfig?.REACT_APP_APPWRITE_URL)
        .setProject(envConfig?.REACT_APP_PROJECT_ID)

        this.databases = new Databases(this.client)

        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featureImage, status, userId}){
        try {
            return await this.databases.createDocument(envConfig?.REACT_APP_DATABASE_ID,envConfig?.REACT_APP_COLLECTION_ID,slug,{title, content, featureImage, status, userId});
        } catch (error) {
            console.log("Error Create", error)
        }
    }

    async updatePost(slug, {title, content, featureImage, status, userId}){
        try {
            return await this.databases.updateDocument(envConfig?.REACT_APP_DATABASE_ID,envConfig?.REACT_APP_COLLECTION_ID,slug,{title, content, featureImage, status})
        } catch (error) {
            console.log("Error Update", error)
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(envConfig?.REACT_APP_DATABASE_ID,envConfig?.REACT_APP_COLLECTION_ID,slug)
            return true;
        } catch (error) {
            console.log("Error Delete", error)
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.getDocument(envConfig?.REACT_APP_DATABASE_ID,envConfig?.REACT_APP_COLLECTION_ID,slug)
        } catch (error) {
            console.log("Error Get", error)
            return false;
        }
    }

    async getAllPost(queries = [Query.equal("status", "active")]){
        try {
            return await this.getDocument(envConfig?.REACT_APP_DATABASE_ID,envConfig?.REACT_APP_COLLECTION_ID, queries)
        } catch (error) {
            console.log("Error GetAll", error)
            return false;
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(envConfig?.REACT_APP_BUCKET_ID, ID.unique(), file )
        } catch (error) {
            console.log("Error Upload file", error)
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(envConfig?.REACT_APP_BUCKET_ID, fileId)
            return true;
        } catch (error) {
            console.log("Error Delete File", error)
            return false;
        }
    }

    async getFilePreview(fileId){
        try {
            return await this.bucket.getFilePreview(envConfig?.REACT_APP_BUCKET_ID, fileId)
        } catch (error) {
            
        }
    }

};

const service = new Service();

export default service;