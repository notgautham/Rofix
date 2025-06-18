import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Sidebar from './Sidebar';
import { Upload, Video, FileText, CheckCircle, Loader, AlertCircle, X } from 'lucide-react';

interface UploadPageProps {
  user: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const UploadPage: React.FC<UploadPageProps> = ({ user, onNavigate, onLogout }) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [gpsFile, setGpsFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [videoError, setVideoError] = useState<string>('');
  const [gpsError, setGpsError] = useState<string>('');

  const validateVideoFile = (file: File): string => {
    const validTypes = ['video/mp4', 'video/avi', 'video/quicktime'];
    const maxSize = 500 * 1024 * 1024; // 500MB

    if (!validTypes.includes(file.type)) {
      return 'Please upload a valid video file (.mp4, .avi, .mov)';
    }
    if (file.size > maxSize) {
      return 'Video file must be less than 500MB';
    }
    return '';
  };

  const validateGpsFile = (file: File): string => {
    const validTypes = ['text/csv', 'application/gpx+xml'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type) && !file.name.endsWith('.csv') && !file.name.endsWith('.gpx')) {
      return 'Please upload a valid GPS file (.csv, .gpx)';
    }
    if (file.size > maxSize) {
      return 'GPS file must be less than 10MB';
    }
    return '';
  };

  const handleFileSelect = (type: 'video' | 'gps', file: File | null) => {
    if (type === 'video') {
      setVideoFile(file);
      setVideoError('');
      if (file) {
        const error = validateVideoFile(file);
        if (error) {
          setVideoError(error);
          toast.error(error);
        } else {
          toast.success('Video file validated successfully!');
        }
      }
    } else {
      setGpsFile(file);
      setGpsError('');
      if (file) {
        const error = validateGpsFile(file);
        if (error) {
          setGpsError(error);
          toast.error(error);
        } else {
          toast.success('GPS file validated successfully!');
        }
      }
    }
  };

  const handleUpload = async () => {
    if (!videoFile || !gpsFile) {
      toast.error('Please select both video and GPS files');
      return;
    }

    if (videoError || gpsError) {
      toast.error('Please fix file validation errors before uploading');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadStatus('Uploading files...');
    toast.loading('Starting upload...');

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setUploadStatus('Processing analysis...');
          toast.dismiss();
          toast.loading('Processing analysis...');
          setTimeout(() => {
            setUploadStatus('Analysis complete!');
            setIsUploading(false);
            toast.dismiss();
            toast.success('Analysis completed successfully!');
          }, 3000);
          return 100;
        }
        return prev + 8;
      });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar
        user={user}
        currentPage="upload"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="glass-header p-6 border-b border-slate-800/50">
          <h1 className="text-2xl font-bold text-slate-100 mb-2">Upload Analysis</h1>
          <p className="text-slate-400">Upload dashcam video and GPS data for road condition analysis</p>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-2xl">
            <div className="glass-card p-8 rounded-2xl">
              <div className="space-y-8">
                {/* Video Upload */}
                <FileUploadCard
                  title="Dashcam Video"
                  description="Upload your dashcam recording (.mp4, .avi, .mov)"
                  icon={Video}
                  file={videoFile}
                  onFileSelect={(file) => handleFileSelect('video', file)}
                  acceptedTypes=".mp4,.avi,.mov,video/*"
                  error={videoError}
                  gradient="from-red-500/10 to-orange-500/10"
                />

                {/* GPS Upload */}
                <FileUploadCard
                  title="GPS Log"
                  description="Upload GPS tracking data (.csv, .gpx)"
                  icon={FileText}
                  file={gpsFile}
                  onFileSelect={(file) => handleFileSelect('gps', file)}
                  acceptedTypes=".csv,.gpx"
                  error={gpsError}
                  gradient="from-blue-500/10 to-cyan-500/10"
                />

                {/* Upload Button */}
                <button
                  onClick={handleUpload}
                  disabled={!videoFile || !gpsFile || isUploading || videoError !== '' || gpsError !== ''}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 px-6 rounded-xl font-medium transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/25 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:scale-105"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Submit for Analysis
                </button>

                {/* Progress Section */}
                {isUploading && (
                  <div className="glass-card p-8 rounded-xl animate-fade-in">
                    <div className="flex items-center justify-center mb-6">
                      <div className="relative w-24 h-24">
                        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="35"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="none"
                            className="text-slate-700"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="35"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 35}`}
                            strokeDashoffset={`${2 * Math.PI * 35 * (1 - uploadProgress / 100)}`}
                            className="text-cyan-500 transition-all duration-300"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-slate-100 font-bold text-lg">{uploadProgress}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-100 font-semibold mb-2">{uploadStatus}</p>
                      <div className="flex items-center justify-center text-slate-400">
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </div>
                    </div>
                  </div>
                )}

                {/* Status Messages */}
                {uploadStatus === 'Analysis complete!' && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center animate-fade-in">
                    <CheckCircle className="w-6 h-6 text-emerald-400 mr-3" />
                    <div>
                      <p className="text-emerald-400 font-semibold">Analysis Complete!</p>
                      <p className="text-emerald-400/80 text-sm">Your road analysis is ready to view.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FileUploadCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  file: File | null;
  onFileSelect: (file: File | null) => void;
  acceptedTypes: string;
  error?: string;
  gradient: string;
}

const FileUploadCard: React.FC<FileUploadCardProps> = ({
  title,
  description,
  icon: Icon,
  file,
  onFileSelect,
  acceptedTypes,
  error,
  gradient
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      onFileSelect(droppedFile);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    onFileSelect(selectedFile);
  };

  const removeFile = () => {
    onFileSelect(null);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-xl p-6 transition-all duration-300 ${
        isDragOver
          ? 'border-cyan-500/50 bg-cyan-500/5 scale-105'
          : error
          ? 'border-red-500/50 bg-red-500/5'
          : file
          ? 'border-emerald-500/50 bg-emerald-500/5'
          : 'border-slate-700 hover:border-cyan-500/50'
      } ${!file && !error ? `bg-gradient-to-br ${gradient}` : ''}`}
    >
      <div className="flex items-center justify-center">
        <div className="text-center">
          <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 ${
            file ? 'animate-pulse-slow' : ''
          }`}>
            <Icon className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-semibold text-slate-100 mb-2">{title}</h3>
          <p className="text-slate-400 text-sm mb-4">{description}</p>
          
          {file ? (
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-2 text-emerald-400">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">{file.name}</span>
                <button
                  onClick={removeFile}
                  className="p-1 hover:bg-red-500/20 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-red-400" />
                </button>
              </div>
              <p className="text-xs text-slate-500">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <label className="inline-flex items-center px-4 py-3 glass-button rounded-xl cursor-pointer hover:scale-105 transition-all duration-200">
              <Upload className="w-4 h-4 mr-2" />
              Choose File
              <input
                type="file"
                accept={acceptedTypes}
                onChange={handleFileInputChange}
                className="hidden"
              />
            </label>
          )}

          {error && (
            <div className="mt-3 flex items-center justify-center text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;