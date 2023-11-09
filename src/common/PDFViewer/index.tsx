import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Pagination from '../Pagination';
import ReactResizeDetector from 'react-resize-detector';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

const PDFViewer = ({ file }: { file: string }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <>
      <div className='h-full'>
        <ReactResizeDetector handleWidth handleHeight>
          {({ width, targetRef }) => (
            <div ref={targetRef as any} className='w-full h-full'>
              <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                externalLinkTarget='_blank'
                loading='Please wait...'
              >
                {/* Show all pages at once */}
                {/* {Array.apply(null, Array(numPages))
                .map((x, i) => i + 1)
                .map((page) => (
                  <Page pageNumber={page} />
                ))} */}
                <Page pageNumber={pageNumber} width={width ? width : 1} />
              </Document>
            </div>
          )}
        </ReactResizeDetector>

        <Pagination
          page={pageNumber}
          setPage={setPageNumber}
          defaultTotalPages={numPages}
        />
      </div>
    </>
  );
};

export default PDFViewer;
