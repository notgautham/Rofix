import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Upload, Video, FileText, CheckCircle, Loader } from 'lucide-react';

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

  const handleFileSelect = (type: 'video' | 'gps', file: File | null) => {
    if (type === 'video') {
      setVideoFile(file);
    } else {
      setGpsFile(file);
    }
  };

  const handleUpload = async () => {
    if (!videoFile || !gpsFile) {
      alert('Please select both video and GPS files');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadStatus('Uploading files...');

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setUploadStatus('Processing analysis...');
          setTimeout(() => {
            setUploadStatus('Analysis complete!');
            setIsUploading(false);
          }, 2000);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
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
        <div className="bg-slate-900/50 backdrop-blur-lg border-b border-slate-800 p-5">
          <h1 className="text-xl font-semibold text-slate-100 mb-1">Upload Analysis</h1>
          <p className="text-slate-400 text-sm">Upload dashcam video and GPS data for road condition analysis</p>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-5">
          <div className="w-full max-w-xl">
            <div className="bg-slate-900/50 backdrop-blur-lg rounded-xl p-6 border border-slate-800 shadow-lg">
              <div className="space-y-5">
                {/* Video Upload */}
                <FileUploadCard
                  title="Dashcam Video"
                  description="Upload your dashcam recording (.mp4, .avi, .mov)"
                  icon={Video}
                  file={videoFile}
                  onFileSelect={(file) => handleFileSelect('video', file)}
                  acceptedTypes=".mp4,.avi,.mov"
                />

                {/* GPS Upload */}
                <FileUploadCard
                  title="GPS Log"
                  description="Upload GPS tracking data (.csv, .gpx)"
                  icon={FileText}
                  file={gpsFile}
                  onFileSelect={(file) => handleFileSelect('gps', file)}
                  acceptedTypes=".csv,.gpx"
                />

                {/* Upload Button */}
                <button
                  onClick={handleUpload}
                  disabled={!videoFile || !gpsFile || isUploading}
                  className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 focus:outline-none focus:ring-2 focus:ring-violet-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Submit for Analysis
                </button>

                {/* Progress Section */}
                {isUploading && (
                  <div className="bg-slate-800/50 rounded-lg p-5 border border-slate-700/50 animate-fade-in">
                    <div className="flex items-center justify-center mb-4">
                      <div className="relative w-20 h-20">
                        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
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
                            className="text-violet-500 transition-all duration-300"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-slate-100 font-bold text-base">{uploadProgress}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-100 font-medium mb-1 text-sm">{uploadStatus}</p>
                      <div className="flex items-center justify-center text-xs text-slate-400">
                        <Loader className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                        Processing...
                      </div>
                    </div>
                  </div>
                )}

                {/* Status Messages */}
                {uploadStatus === 'Analysis complete!' && (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3.5 flex items-center animate-fade-in">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2.5" />
                    <div>
                      <p className="text-green-400 font-medium text-sm">Analysis Complete!</p>
                      <p className="text-green-400/80 text-xs">Your road analysis is ready to view.</p>
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
}

const FileUploadCard: React.FC<FileUploadCardProps> = ({
  title,
  description,
  icon: Icon,
  file,
  onFileSelect,
  acceptedTypes
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      onFileSelect(droppedFile);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    onFileSelect(selectedFile);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="border-2 border-dashed border-slate-700 rounded-lg p-5 hover:border-violet-500/50 transition-all duration-300 bg-slate-800/30"
    >
      <div className="flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon className="w-6 h-6 text-violet-400" />
          </div>
          <h3 className="text-base font-medium text-slate-100 mb-1">{title}</h3>
          <p className="text-slate-400 text-xs mb-3">{description}</p>
          
          {file ? (
            <div className="flex items-center justify-center space-x-2 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs font-medium">{file.name}</span>
            </div>
          ) : (
            <label className="inline-flex items-center px-3 py-2 bg-slate-800 text-slate-100 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors text-sm border border-slate-700">
              <Upload className="w-3.5 h-3.5 mr-1.5" />
              Choose File
              <input
                type="file"
                accept={acceptedTypes}
                onChange={handleFileInputChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;