import React, { useState } from 'react';
import { Download, Monitor, Volume2, VolumeX, BookOpen, Info, HelpCircle } from 'lucide-react';
import { sound } from '../utils/audio';

interface TeacherToolbarProps {
  projectorMode: boolean;
  onToggleProjector: () => void;
  onOpenQuestionBank: () => void;
  onDownloadOfflineHtml: () => void;
}

export const TeacherToolbar: React.FC<TeacherToolbarProps> = ({
  projectorMode,
  onToggleProjector,
  onOpenQuestionBank,
  onDownloadOfflineHtml,
}) => {
  const [audioEnabled, setAudioEnabled] = useState(sound.isEnabled());
  const [showGuideModal, setShowGuideModal] = useState(false);

  const toggleSound = () => {
    const newState = !audioEnabled;
    sound.setEnabled(newState);
    setAudioEnabled(newState);
    if (newState) sound.playClick();
  };

  return (
    <>
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 px-4 shadow-xl backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Quick indicators */}
        <div className="flex items-center gap-2 text-slate-300 font-bold">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span>BẢNG ĐIỀU KHIỂN GIÁO VIÊN:</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Audio toggle */}
          <button
            onClick={toggleSound}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
              audioEnabled
                ? 'bg-slate-800 text-emerald-400 border-slate-700 hover:bg-slate-700'
                : 'bg-slate-800 text-slate-500 border-slate-700'
            }`}
            title="Bật / Tắt hiệu ứng âm thanh Web Audio API"
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>{audioEnabled ? 'Âm thanh: BẬT' : 'Âm thanh: TẮT'}</span>
          </button>

          {/* Projector Mode */}
          <button
            onClick={onToggleProjector}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
              projectorMode
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Phóng to giao diện và tối ưu độ tương phản cho Máy chiếu / Bảng tương tác"
          >
            <Monitor className="w-4 h-4" />
            <span>{projectorMode ? 'Chế độ Máy Chiếu: BẬT' : 'Chế độ Máy Chiếu'}</span>
          </button>

          {/* Question Bank */}
          <button
            onClick={onOpenQuestionBank}
            className="px-3 py-1.5 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            title="Quản lý và chỉnh sửa ngân hàng 60 câu hỏi"
          >
            <BookOpen className="w-4 h-4" />
            <span>Ngân Hàng Câu Hỏi (60)</span>
          </button>

          {/* Download Standalone HTML Button */}
          <button
            onClick={onDownloadOfflineHtml}
            className="px-3.5 py-1.5 rounded-xl font-extrabold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 flex items-center gap-1.5 transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            title="Tải về trọn bộ ứng dụng trong 01 file HTML duy nhất để mang đi dạy không cần mạng Internet"
          >
            <Download className="w-4 h-4" />
            <span>TẢI 1 FILE HTML OFFLINE 100%</span>
          </button>

          {/* User Guide */}
          <button
            onClick={() => setShowGuideModal(true)}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
            title="Hướng dẫn sử dụng và chèn công thức Toán MathType"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Teacher Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl flex flex-col gap-4 animate-fadeIn">
            <h3 className="text-xl font-black text-emerald-400 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Info className="w-6 h-6" /> HƯỚNG DẪN DÀNH CHO GIÁO VIÊN TOÁN THPT
            </h3>

            <div className="text-slate-200 text-sm leading-relaxed space-y-3 max-h-[60vh] overflow-y-auto pr-2">
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <h4 className="font-bold text-amber-300 mb-1">1. Cách sử dụng trên Lớp học & Máy chiếu:</h4>
                <p className="text-xs text-slate-300">
                  - Bấm nút <b>"Chế độ Máy Chiếu"</b> để chữ và nút bấm phóng to rõ nét nhất cho học sinh ngồi cuối lớp nhìn rõ.
                  <br />
                  - Có thể chia lớp thành 3 Đội (Đội Đỏ, Đội Xanh, Đội Vàng) trong <i>Vòng Quay May Mắn</i> hoặc thi cá nhân trong <i>Ai Là Triệu Phú</i> và <i>Đua Xe Tốc Độ</i>.
                </p>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <h4 className="font-bold text-blue-300 mb-1">2. Cách chạy OFFLINE 100% không cần Internet:</h4>
                <p className="text-xs text-slate-300">
                  - Bấm nút <b>"TẢI 1 FILE HTML OFFLINE 100%"</b>. Trình duyệt sẽ tải về máy file <code>Dau_Truong_Toan_Hoc_THPT_GDPT2018_KNTT.html</code>.
                  <br />
                  - Quý thầy cô chỉ cần chép file này vào USB hoặc cắm vào máy tính trường học, mở trực tiếp bằng Chrome, Cốc Cốc, Edge là chạy mượt mà không cần mạng.
                </p>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <h4 className="font-bold text-emerald-300 mb-1">3. Cách chèn công thức Toán (MathType / LaTeX):</h4>
                <p className="text-xs text-slate-300">
                  - Ứng dụng tích hợp công nghệ KaTeX chuẩn quốc tế. Thầy cô chỉ cần đặt công thức giữa hai dấu đô la: <code>$công_thức$</code>.
                  - Ví dụ: <code>{'$int_0^1 (2x + 1)dx = 2$'}</code> hoặc <code>{'$lim_{x \\to 2} \\frac{x^2 - 4}{x - 2} = 4$'}</code>.
                  <br />
                  - Trong phần mềm MathType: Chọn <i>Preferences &gt; Cut and Copy Preferences &gt; MathML or TeX</i> rồi Copy paste vào ứng dụng là hiển thị chuẩn 100%.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowGuideModal(false)}
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm cursor-pointer shadow-lg"
              >
                Đã Hiểu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
