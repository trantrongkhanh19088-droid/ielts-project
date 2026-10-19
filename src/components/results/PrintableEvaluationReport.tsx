'use client';

import React from 'react';
import { Award, Clock, FileText, CheckCircle2, AlertCircle, Sparkles, Target, Layers, SpellCheck, ShieldAlert, Lightbulb } from 'lucide-react';
import { EssayRecord, GradingResult, FullTestGradingResult, SentenceCorrection, VocabularyUpgrade } from '@/types';
import { formatDuration } from '@/lib/utils';
import AcademicLogo from '@/components/brand/AcademicLogo';

interface PrintableEvaluationReportProps {
  record: EssayRecord;
}

export default function PrintableEvaluationReport({ record }: PrintableEvaluationReportProps) {
  const isFullTest = record.task_type === 'full_test';
  const fullTestFeedback = isFullTest ? (record.ai_feedback_json as FullTestGradingResult) : null;

  // Filter valid corrections helper
  const getValidCorrections = (corrections: SentenceCorrection[] = []) => {
    return corrections.filter((corr) => {
      if (!corr || typeof corr.original !== 'string' || typeof corr.corrected !== 'string') return false;
      const orig = corr.original.trim().toLowerCase().replace(/[.,!?;:"'“”]/g, '');
      const fixed = corr.corrected.trim().toLowerCase().replace(/[.,!?;:"'“”]/g, '');
      if (orig === fixed) return false;
      const expl = (corr.explanationVi || '').toLowerCase();
      if (
        expl.includes('không cần chỉnh sửa') ||
        expl.includes('không cần sửa') ||
        expl.includes('hoàn toàn chính xác') ||
        expl.includes('không có lỗi') ||
        expl.includes('đã chuẩn xác') ||
        expl.includes('rất chuẩn xác') ||
        expl.includes('đã hoàn toàn chuẩn')
      ) {
        return false;
      }
      return true;
    });
  };

  const renderSingleTaskSection = (
    result: GradingResult,
    taskIndexLabel: string,
    chartImageUrl?: string
  ) => {
    const isTask1 = result.taskType === 'task1';
    const taLabel = isTask1 ? 'Task Achievement (TA)' : 'Task Response (TR)';
    const validCorrections = getValidCorrections(result.sentenceCorrections);
    const paragraphs = (result.userEssay || '').split('\n\n').filter(Boolean);
    const modelParagraphs = (result.modelEssayBand8 || '').split('\n\n').filter(Boolean);

    return (
      <div className="space-y-6 pt-2">
        {/* Task Header & Prompt */}
        <div className="border border-gray-300 p-4 rounded-lg bg-gray-50/70 avoid-page-break">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
            <span className="font-mono text-xs font-bold text-red-700 uppercase">
              {taskIndexLabel} // {isTask1 ? 'ACADEMIC WRITING TASK 1' : 'WRITING TASK 2'}
            </span>
            <span className="font-mono text-xs text-gray-600">
              {result.wordCount} từ (Mục tiêu: {isTask1 ? '≥150 từ' : '≥250 từ'}) • Thời gian: {formatDuration(result.timeSpentSeconds)}
            </span>
          </div>
          <h3 className="font-bold text-base text-gray-900 mb-1">{result.promptTitle}</h3>
          <p className="text-xs text-gray-700 leading-relaxed italic">{result.promptText}</p>
          {chartImageUrl && isTask1 && (
            <div className="mt-3 pt-2 border-t border-gray-200 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={chartImageUrl}
                alt="Biểu đồ đề bài Task 1"
                className="max-h-56 mx-auto object-contain border border-gray-300 bg-white p-1 rounded"
              />
            </div>
          )}
        </div>

        {/* Score Summary Grid */}
        <div className="border border-gray-300 p-4 rounded-lg bg-white avoid-page-break">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-3">
            <div>
              <span className="text-xs font-mono uppercase text-gray-500">Bảng Điểm Đánh Giá Chi Tiết</span>
              <h4 className="text-lg font-bold text-gray-900">
                {isTask1 ? 'Kết Quả Writing Task 1' : 'Kết Quả Writing Task 2'}
              </h4>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 border border-gray-300 px-3 py-1.5 rounded-lg">
              <span className="text-xs font-mono font-bold text-gray-600 uppercase">Overall Band:</span>
              <span className="text-2xl font-mono font-bold text-red-600">
                {Number(result.overallBand).toFixed(1)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2 border border-gray-200 rounded bg-gray-50">
              <span className="block font-mono text-[10px] text-gray-500 uppercase truncate">{taLabel}</span>
              <span className="text-lg font-mono font-bold text-gray-900">
                {Number(result.criteria.taskAchievementOrResponse.score).toFixed(1)}
              </span>
            </div>
            <div className="p-2 border border-gray-200 rounded bg-gray-50">
              <span className="block font-mono text-[10px] text-gray-500 uppercase truncate">Coherence & Cohesion</span>
              <span className="text-lg font-mono font-bold text-gray-900">
                {Number(result.criteria.coherenceCohesion.score).toFixed(1)}
              </span>
            </div>
            <div className="p-2 border border-gray-200 rounded bg-gray-50">
              <span className="block font-mono text-[10px] text-gray-500 uppercase truncate">Lexical Resource</span>
              <span className="text-lg font-mono font-bold text-gray-900">
                {Number(result.criteria.lexicalResource.score).toFixed(1)}
              </span>
            </div>
            <div className="p-2 border border-gray-200 rounded bg-gray-50">
              <span className="block font-mono text-[10px] text-gray-500 uppercase truncate">Grammatical Range</span>
              <span className="text-lg font-mono font-bold text-gray-900">
                {Number(result.criteria.grammaticalRange.score).toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MỤC 1: SỬA LỖI BÀI VIẾT & BÀI LÀM CỦA THÍ SINH */}
        {/* ========================================================================= */}
        <div className="space-y-4 pt-2">
          <div className="border-b-2 border-gray-900 pb-1 flex items-center justify-between">
            <h4 className="font-bold text-sm text-gray-900 uppercase tracking-wide flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-gray-900 text-white font-mono text-xs">MỤC 01</span>
              <span>Sửa Lỗi Bài Viết &amp; Phân Tích Câu Sai ({validCorrections.length} lỗi)</span>
            </h4>
            <span className="font-mono text-xs text-gray-500">Candidate Essay &amp; Detailed Corrections</span>
          </div>

          {/* Candidate Essay Full Content */}
          <div className="border border-gray-300 p-4 rounded-lg bg-white space-y-2.5">
            <div className="flex items-center justify-between border-b border-gray-200 pb-1.5 text-xs text-gray-500">
              <span className="font-semibold text-gray-800">Toàn văn bài làm của thí sinh:</span>
              <span className="font-mono">{result.wordCount} words</span>
            </div>
            <div className="text-xs text-gray-800 leading-relaxed space-y-2 font-serif">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="indent-4 leading-normal">{p}</p>
              ))}
            </div>
          </div>

          {/* Corrections Details Table / Cards */}
          {validCorrections.length === 0 ? (
            <div className="border border-emerald-300 bg-emerald-50/70 p-3.5 rounded-lg text-xs text-emerald-900 flex items-center gap-2 avoid-page-break">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Kiểm soát ngữ pháp &amp; từ vựng xuất sắc:</strong> Không phát hiện lỗi sai câu đáng kể trong bài viết.
              </span>
            </div>
          ) : (
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-gray-700 block">
                Bảng chi tiết các câu cần chỉnh sửa và hướng dẫn nâng band:
              </span>
              <div className="space-y-2">
                {validCorrections.map((corr, cIdx) => (
                  <div
                    key={cIdx}
                    className="border border-gray-300 rounded-lg p-3 bg-white space-y-1.5 avoid-page-break text-xs"
                  >
                    <div className="flex items-center justify-between border-b border-gray-200 pb-1">
                      <span className="font-mono font-bold text-[11px] px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
                        Lỗi #{cIdx + 1} — {corr.errorType || 'Grammar'}
                      </span>
                      <span className="font-mono text-[10px] text-gray-500">Sentence Correction</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                      <div className="p-2 bg-rose-50/60 border border-rose-200 rounded">
                        <span className="font-bold text-rose-700 text-[10px] uppercase block mb-0.5">
                          Câu gốc của bạn (Chưa chuẩn):
                        </span>
                        <p className="text-rose-950 italic">&ldquo;{corr.original}&rdquo;</p>
                      </div>

                      <div className="p-2 bg-emerald-50/60 border border-emerald-200 rounded">
                        <span className="font-bold text-emerald-700 text-[10px] uppercase block mb-0.5">
                          Gợi ý sửa chuẩn Band 8.0+:
                        </span>
                        <p className="text-emerald-950 font-medium">&ldquo;{corr.corrected}&rdquo;</p>
                      </div>
                    </div>

                    {corr.explanationVi && (
                      <div className="p-2 bg-gray-50 border border-gray-200 rounded text-gray-700 leading-relaxed text-[11px]">
                        <strong>Giải thích:</strong> {corr.explanationVi}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* MỤC 2: ĐÁNH GIÁ 4 TIÊU CHÍ CHI TIẾT */}
        {/* ========================================================================= */}
        <div className="space-y-4 pt-4 break-before-page">
          <div className="border-b-2 border-gray-900 pb-1 flex items-center justify-between">
            <h4 className="font-bold text-sm text-gray-900 uppercase tracking-wide flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-gray-900 text-white font-mono text-xs">MỤC 02</span>
              <span>Đánh Giá Chi Tiết Theo 4 Tiêu Chí Chấm Thi IELTS</span>
            </h4>
            <span className="font-mono text-xs text-gray-500">4 Assessment Criteria Breakdown</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* TA / TR */}
            <div className="border border-gray-300 rounded-lg p-3.5 bg-white space-y-1.5 avoid-page-break text-xs">
              <div className="flex items-center justify-between border-b border-gray-200 pb-1">
                <span className="font-bold text-gray-900">{taLabel}</span>
                <span className="font-mono font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                  Band {Number(result.criteria.taskAchievementOrResponse.score).toFixed(1)}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 italic">
                {isTask1
                  ? 'Mức độ hoàn thành yêu cầu đề bài, tổng quan xu hướng & trích dẫn số liệu'
                  : 'Mức độ trả lời trọn vẹn câu hỏi đề bài & độ sâu lập luận luận điểm'}
              </p>
              <p className="text-gray-800 leading-relaxed pt-1 text-[11.5px]">
                {result.criteria.taskAchievementOrResponse.feedback}
              </p>
            </div>

            {/* CC */}
            <div className="border border-gray-300 rounded-lg p-3.5 bg-white space-y-1.5 avoid-page-break text-xs">
              <div className="flex items-center justify-between border-b border-gray-200 pb-1">
                <span className="font-bold text-gray-900">Coherence &amp; Cohesion (CC)</span>
                <span className="font-mono font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                  Band {Number(result.criteria.coherenceCohesion.score).toFixed(1)}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 italic">
                Tính mạch lạc, tổ chức bố cục đoạn văn &amp; phương tiện liên kết câu
              </p>
              <p className="text-gray-800 leading-relaxed pt-1 text-[11.5px]">
                {result.criteria.coherenceCohesion.feedback}
              </p>
            </div>

            {/* LR */}
            <div className="border border-gray-300 rounded-lg p-3.5 bg-white space-y-1.5 avoid-page-break text-xs">
              <div className="flex items-center justify-between border-b border-gray-200 pb-1">
                <span className="font-bold text-gray-900">Lexical Resource (LR)</span>
                <span className="font-mono font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                  Band {Number(result.criteria.lexicalResource.score).toFixed(1)}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 italic">
                Vốn từ vựng, độ chính xác ngữ cảnh &amp; cụm từ học thuật (Collocations)
              </p>
              <p className="text-gray-800 leading-relaxed pt-1 text-[11.5px]">
                {result.criteria.lexicalResource.feedback}
              </p>
            </div>

            {/* GRA */}
            <div className="border border-gray-300 rounded-lg p-3.5 bg-white space-y-1.5 avoid-page-break text-xs">
              <div className="flex items-center justify-between border-b border-gray-200 pb-1">
                <span className="font-bold text-gray-900">Grammatical Range &amp; Accuracy (GRA)</span>
                <span className="font-mono font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                  Band {Number(result.criteria.grammaticalRange.score).toFixed(1)}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 italic">
                Độ đa dạng cấu trúc ngữ pháp phức tạp, độ chính xác thì &amp; dấu câu
              </p>
              <p className="text-gray-800 leading-relaxed pt-1 text-[11.5px]">
                {result.criteria.grammaticalRange.feedback}
              </p>
            </div>
          </div>

          {/* Diagnostic Roadmap if present */}
          {result.diagnosticRoadmap && (
            <div className="border border-amber-300 bg-amber-50/70 rounded-lg p-3.5 space-y-2 avoid-page-break text-xs">
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-amber-900 uppercase">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span>Lộ Trình Đột Phá Điểm Số // Diagnostic Roadmap:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                {result.diagnosticRoadmap.bandCeilingFactor && (
                  <div className="p-2 bg-white rounded border border-amber-200">
                    <span className="font-bold text-rose-700 block mb-0.5">Rào cản điểm số (Band Ceiling):</span>
                    <p className="text-gray-800 leading-relaxed">{result.diagnosticRoadmap.bandCeilingFactor}</p>
                  </div>
                )}
                {result.diagnosticRoadmap.topPriorityFix && (
                  <div className="p-2 bg-white rounded border border-amber-200">
                    <span className="font-bold text-emerald-700 block mb-0.5">Hành động ưu tiên #1:</span>
                    <p className="text-gray-800 leading-relaxed">{result.diagnosticRoadmap.topPriorityFix}</p>
                  </div>
                )}
              </div>
              {result.diagnosticRoadmap.examinerNoteVi && (
                <div className="text-[11px] text-amber-950 italic pt-1 border-t border-amber-200">
                  💡 Lời khuyên Giám khảo: &ldquo;{result.diagnosticRoadmap.examinerNoteVi}&rdquo;
                </div>
              )}
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* MỤC 3: GỢI Ý NÂNG CẤP TỪ VỰNG C1/C2 */}
        {/* ========================================================================= */}
        <div className="space-y-4 pt-4 avoid-page-break">
          <div className="border-b-2 border-gray-900 pb-1 flex items-center justify-between">
            <h4 className="font-bold text-sm text-gray-900 uppercase tracking-wide flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-gray-900 text-white font-mono text-xs">MỤC 03</span>
              <span>Gợi Ý Nâng Cấp Từ Vựng Học Thuật C1/C2 ({result.vocabularyUpgrades.length} cụm từ)</span>
            </h4>
            <span className="font-mono text-xs text-gray-500">Lexical Resource Upgrades</span>
          </div>

          {result.vocabularyUpgrades.length === 0 ? (
            <div className="border border-gray-200 bg-gray-50 p-3 rounded text-xs text-gray-600 italic">
              Vốn từ vựng học thuật trong bài đã rất chuẩn xác và phong phú.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {result.vocabularyUpgrades.map((item, vIdx) => (
                <div
                  key={vIdx}
                  className="border border-gray-300 rounded-lg p-2.5 bg-white space-y-1.5 avoid-page-break text-xs"
                >
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-1">
                    <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 line-through text-[11px]">
                      {item.basicWord}
                    </span>
                    <span className="text-gray-400">→</span>
                    <div className="flex flex-wrap gap-1">
                      {item.academicAlternatives.map((alt, aIdx) => (
                        <span
                          key={aIdx}
                          className="px-2 py-0.5 rounded bg-amber-100/80 border border-amber-200 font-bold text-amber-950 text-[11px]"
                        >
                          {alt}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-700 italic leading-relaxed">
                    <strong>Ví dụ:</strong> &ldquo;{item.contextExample}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* MỤC 4: BÀI MẪU BAND 8.5+ THAM KHẢO */}
        {/* ========================================================================= */}
        <div className="space-y-4 pt-4 break-before-page">
          <div className="border-b-2 border-gray-900 pb-1 flex items-center justify-between">
            <h4 className="font-bold text-sm text-gray-900 uppercase tracking-wide flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-gray-900 text-white font-mono text-xs">MỤC 04</span>
              <span>Bài Viết Mẫu Band 8.5+ Chuẩn Quốc Tế</span>
            </h4>
            <span className="font-mono text-xs text-gray-500">Examiner Model Essay (Band 8.5+)</span>
          </div>

          <div className="border border-emerald-300 rounded-lg p-4 bg-emerald-50/30 space-y-3">
            <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-700" />
                <span className="font-bold text-xs text-emerald-950">
                  Bài mẫu hoàn chỉnh viết bởi AI Examiner chuẩn British Council &amp; IDP
                </span>
              </div>
              <span className="font-mono text-xs text-emerald-800 font-semibold">
                {result.modelEssayBand8.trim().split(/\s+/).filter(Boolean).length} words
              </span>
            </div>

            <div className="text-xs text-gray-900 leading-relaxed space-y-2.5 font-serif">
              {modelParagraphs.map((p, idx) => (
                <p key={idx} className="indent-4 leading-normal">{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="print-report-container font-sans text-black bg-white p-6 sm:p-8 space-y-8 max-w-4xl mx-auto">
      {/* Official Master Document Header */}
      <div className="border-b-2 border-gray-900 pb-4 flex items-start justify-between gap-4 avoid-page-break">
        <div className="flex items-center gap-3">
          <AcademicLogo width={48} height={48} />
          <div>
            <div className="font-mono text-[11px] font-bold tracking-wider text-red-600 uppercase">
              CD-IELTS WRITING OFFICIAL SIMULATOR // AI EXAMINER
            </div>
            <h1 className="font-display font-extrabold text-2xl text-gray-950 tracking-tight leading-tight">
              Báo Cáo Đánh Giá Bài Thi IELTS Writing
            </h1>
            <p className="font-mono text-[11px] text-gray-500 pt-0.5">
              Hệ thống chấm điểm chuẩn khảo thí British Council &amp; IDP • Inspera Assessment Standard
            </p>
          </div>
        </div>

        <div className="text-right font-mono text-xs space-y-0.5 shrink-0">
          <div className="font-bold text-gray-900">
            {new Date(record.created_at).toLocaleDateString('vi-VN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </div>
          <div className="text-gray-500">
            {new Date(record.created_at).toLocaleTimeString('vi-VN', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </div>
          <div className="text-[10px] text-gray-400">ID: {record.id.slice(0, 8)}</div>
        </div>
      </div>

      {/* Full Test Combined Master Banner */}
      {isFullTest && fullTestFeedback && (
        <div className="border-2 border-gray-900 p-5 rounded-lg bg-gray-50 avoid-page-break space-y-3">
          <div className="flex items-center justify-between border-b border-gray-300 pb-2">
            <div>
              <span className="font-mono text-xs font-bold text-red-700 uppercase">
                00 // TỔNG KẾT FULL TEST (60 PHÚT)
              </span>
              <h2 className="text-lg font-bold text-gray-900">
                Tổng Điểm Overall IELTS Writing (Cả 2 Phần Thi)
              </h2>
            </div>
            <div className="text-center px-4 py-2 bg-gray-900 text-white rounded-lg">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-gray-300">Overall Band</span>
              <span className="text-2xl font-mono font-bold text-white">
                {fullTestFeedback.overallBand.toFixed(1)}
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Công thức chuẩn IDP &amp; BC: <code className="font-mono bg-white px-1.5 py-0.5 border border-gray-300 rounded font-bold">(Task 1 + Task 2 &times; 2) / 3</code> = ({fullTestFeedback.task1Result.overallBand.toFixed(1)} + {fullTestFeedback.task2Result.overallBand.toFixed(1)} &times; 2) / 3 = <strong>Band {fullTestFeedback.overallBand.toFixed(1)}</strong>.
          </p>
        </div>
      )}

      {/* Content Rendering */}
      {isFullTest && fullTestFeedback ? (
        <div className="space-y-12">
          {/* Part 1 */}
          <div className="pt-2">
            {renderSingleTaskSection(
              fullTestFeedback.task1Result,
              'PHẦN 1 (TASK 1)',
              record.chart_image_url
            )}
          </div>

          {/* Part 2 */}
          <div className="pt-8 break-before-page">
            {renderSingleTaskSection(
              fullTestFeedback.task2Result,
              'PHẦN 2 (TASK 2)'
            )}
          </div>
        </div>
      ) : (
        renderSingleTaskSection(
          record.ai_feedback_json as GradingResult,
          record.task_type === 'task1' ? 'BÀI THI TASK 1' : 'BÀI THI TASK 2',
          record.chart_image_url
        )
      )}

      {/* Official Footer */}
      <div className="border-t border-gray-300 pt-4 mt-8 flex items-center justify-between text-xs text-gray-500 font-mono avoid-page-break">
        <span>CD-IELTS Writing Simulator • Inspera Official Format</span>
        <span>Trang in tự động • Chuẩn A4</span>
      </div>
    </div>
  );
}
