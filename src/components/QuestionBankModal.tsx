import React, { useState } from 'react';
import { Question } from '../types/game';
import { MathRenderer } from './MathRenderer';
import { X, Plus, Edit2, Check, BookOpen, Trash2 } from 'lucide-react';

interface QuestionBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionsMap: {
    millionaire: Question[];
    wheel: Question[];
    racer: Question[];
    puzzle: Question[];
  };
  onUpdateQuestion: (gameKey: string, question: Question) => void;
  onAddQuestion: (gameKey: string, question: Question) => void;
}

export const QuestionBankModal: React.FC<QuestionBankModalProps> = ({
  isOpen,
  onClose,
  questionsMap,
  onUpdateQuestion,
  onAddQuestion,
}) => {
  const [selectedGame, setSelectedGame] = useState<'millionaire' | 'wheel' | 'racer' | 'puzzle'>('millionaire');
  const [gradeFilter, setGradeFilter] = useState<'all' | '10' | '11' | '12'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Edit draft form
  const [draftContent, setDraftContent] = useState('');
  const [draftOptions, setDraftOptions] = useState<[string, string, string, string]>(['', '', '', '']);
  const [draftCorrect, setDraftCorrect] = useState<0 | 1 | 2 | 3>(0);
  const [draftExplanation, setDraftExplanation] = useState('');
  const [draftTopic, setDraftTopic] = useState('');
  const [draftGrade, setDraftGrade] = useState<'10' | '11' | '12'>('12');

  if (!isOpen) return null;

  const currentList = questionsMap[selectedGame] || [];
  const filteredList = currentList.filter(
    (q) => gradeFilter === 'all' || q.grade === gradeFilter
  );

  const startEdit = (q: Question) => {
    setEditingId(q.id);
    setDraftContent(q.content);
    setDraftOptions([...q.options] as [string, string, string, string]);
    setDraftCorrect(q.correctAnswer);
    setDraftExplanation(q.explanation);
    setDraftTopic(q.topic);
    setDraftGrade(q.grade);
  };

  const saveEdit = (id: string) => {
    const updated: Question = {
      id,
      grade: draftGrade,
      topic: draftTopic || 'Toán THPT KNTT',
      level: 'Thông hiểu',
      content: draftContent,
      options: draftOptions,
      correctAnswer: draftCorrect,
      explanation: draftExplanation,
    };
    onUpdateQuestion(selectedGame, updated);
    setEditingId(null);
  };

  const handleAddNew = () => {
    const newQ: Question = {
      id: `${selectedGame}_${Date.now()}`,
      grade: '12',
      topic: 'Bài tập mới KNTT',
      level: 'Thông hiểu',
      content: 'Nhập nội dung câu hỏi mới với công thức LaTeX $x^2 + 1 = 0$...',
      options: ['Phương án A', 'Phương án B', 'Phương án C', 'Phương án D'],
      correctAnswer: 0,
      explanation: 'Lời giải chi tiết cho câu hỏi mới...',
    };
    onAddQuestion(selectedGame, newQ);
    startEdit(newQ);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                NGÂN HÀNG CÂU HỎI TOÁN THPT (KNTT)
                <span className="text-xs bg-blue-500 text-slate-950 px-2 py-0.5 rounded-full font-bold">
                  60 CÂU GỐC
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Chỉnh sửa công thức LaTeX, đáp án và phương pháp giải sư phạm
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filters and Tabs */}
        <div className="px-5 py-3 border-b border-slate-800 bg-slate-900 flex flex-wrap items-center justify-between gap-3">
          {/* Game Selector Tabs */}
          <div className="flex gap-2">
            {[
              { key: 'millionaire', label: 'Ai Là Triệu Phú (15 câu)' },
              { key: 'wheel', label: 'Vòng Quay May Mắn (15 câu)' },
              { key: 'racer', label: 'Đua Xe Tốc Độ (15 câu)' },
              { key: 'puzzle', label: 'Lật Mảnh Ghép (15 câu)' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setSelectedGame(tab.key as any);
                  setEditingId(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedGame === tab.key
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grade filter & Add button */}
          <div className="flex items-center gap-2">
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value as any)}
              className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 outline-none font-semibold"
            >
              <option value="all">Tất cả Khối Lớp</option>
              <option value="10">Toán Lớp 10</option>
              <option value="11">Toán Lớp 11</option>
              <option value="12">Toán Lớp 12</option>
            </select>

            <button
              onClick={handleAddNew}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" /> Thêm Câu Mới
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 bg-slate-950/40">
          {filteredList.map((q, index) => {
            const isEditing = editingId === q.id;

            if (isEditing) {
              return (
                <div
                  key={q.id}
                  className="bg-slate-900 border-2 border-blue-500/80 rounded-2xl p-5 flex flex-col gap-4 shadow-xl"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-blue-400">
                    <span>Đang chỉnh sửa câu hỏi #{index + 1}</span>
                    <div className="flex gap-2">
                      <select
                        value={draftGrade}
                        onChange={(e) => setDraftGrade(e.target.value as any)}
                        className="bg-slate-800 text-slate-200 border border-slate-700 px-2 py-1 rounded-lg text-xs"
                      >
                        <option value="10">Lớp 10</option>
                        <option value="11">Lớp 11</option>
                        <option value="12">Lớp 12</option>
                      </select>
                      <input
                        type="text"
                        value={draftTopic}
                        onChange={(e) => setDraftTopic(e.target.value)}
                        placeholder="Chủ đề..."
                        className="bg-slate-800 text-slate-200 border border-slate-700 px-2 py-1 rounded-lg text-xs w-48"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-400 mb-1 block">
                      Nội dung câu hỏi (hỗ trợ $công thức$ LaTeX):
                    </label>
                    <textarea
                      value={draftContent}
                      onChange={(e) => setDraftContent(e.target.value)}
                      rows={3}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white text-sm outline-none font-mono"
                    />
                    <div className="mt-1 text-xs text-slate-400 bg-slate-950/50 p-2 rounded-lg border border-slate-800">
                      <b>Xem trước:</b> <MathRenderer content={draftContent} />
                    </div>
                  </div>

                  {/* 4 Options editor */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['A', 'B', 'C', 'D'].map((letter, optIdx) => (
                      <div key={letter} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`correct_${q.id}`}
                          checked={draftCorrect === optIdx}
                          onChange={() => setDraftCorrect(optIdx as any)}
                          className="accent-emerald-500 w-4 h-4 cursor-pointer"
                        />
                        <span className="font-bold text-slate-400 text-xs">{letter}:</span>
                        <input
                          type="text"
                          value={draftOptions[optIdx]}
                          onChange={(e) => {
                            const newOpts = [...draftOptions] as [string, string, string, string];
                            newOpts[optIdx] = e.target.value;
                            setDraftOptions(newOpts);
                          }}
                          className="flex-1 bg-slate-950 border border-slate-700 rounded-lg p-2 text-white text-xs outline-none"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-400 mb-1 block">
                      Lời giải chi tiết:
                    </label>
                    <textarea
                      value={draftExplanation}
                      onChange={(e) => setDraftExplanation(e.target.value)}
                      rows={2}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200 text-xs outline-none font-mono"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs cursor-pointer"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      onClick={() => saveEdit(q.id)}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Check className="w-4 h-4" /> Lưu Câu Hỏi
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={q.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-col gap-3 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-blue-900/60 text-blue-300 text-xs font-bold border border-blue-600/30">
                      Câu {index + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Lớp {q.grade} • {q.topic}
                    </span>
                    <span className="text-xs text-amber-400 font-bold">[{q.level}]</span>
                  </div>
                  <button
                    onClick={() => startEdit(q)}
                    className="p-1.5 bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white rounded-lg text-xs flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Sửa
                  </button>
                </div>

                <div className="text-white font-semibold text-sm leading-relaxed">
                  <MathRenderer content={q.content} />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  {q.options.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className={`p-2 rounded-lg border ${
                        oIdx === q.correctAnswer
                          ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300 font-bold'
                          : 'bg-slate-950/40 border-slate-800 text-slate-400'
                      }`}
                    >
                      <span className="font-bold mr-1">
                        {['A', 'B', 'C', 'D'][oIdx]}.
                      </span>
                      <MathRenderer content={opt} />
                    </div>
                  ))}
                </div>

                <div className="text-xs text-slate-400 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/80">
                  <span className="text-emerald-400 font-bold">Giải thích: </span>
                  <MathRenderer content={q.explanation} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-between items-center text-xs text-slate-400">
          <span>Tổng số: {filteredList.length} câu hỏi hiển thị</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl cursor-pointer"
          >
            Đóng Bảng Quản Lý
          </button>
        </div>
      </div>
    </div>
  );
};
