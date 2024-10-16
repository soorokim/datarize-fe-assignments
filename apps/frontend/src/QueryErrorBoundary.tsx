import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from './components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './components/ui/card';

export const QueryErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => {
            console.log(error);
            return (
              <Card>
                <CardHeader>에러가 발생했습니다.</CardHeader>
                <CardContent>{error.response.data.error}</CardContent>
                <CardFooter>
                  <Button onClick={resetErrorBoundary}>초기화</Button>
                </CardFooter>
              </Card>
            );
          }}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
