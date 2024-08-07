import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'components/Layout/Layout';
import { PrivateRoute } from 'components/PrivateRoute';
import { RestrictedRoute } from 'components/RestrictedRoute';
import { refreshUser } from 'redux/auth/operations';
import { useAuth } from 'hooks';
import { Loader } from 'components/Loader/Loader';

const HomePage = lazy(() => import('../pages/Home'));
const RegisterPage = lazy(() => import('../pages/Register'));
const LoginPage = lazy(() => import('../pages/Login'));
const ContactsPage = lazy(() => import('../pages/Contacts'));


export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <div>
      {isRefreshing ? (<b>Refreshing user...</b>)
        : (
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route
                  path="/register"
                  element={
                    <RestrictedRoute redirectTo="/contacts" component={<RegisterPage />} />
                  }
                />
                <Route
                  path="/login"
                  element={
                    <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
                  }
                />
                <Route
                  path="/contacts"
                  element={
                    <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
                  }
                />
              </Route>
            </Routes>
          </Suspense>
        )
      }
    </div>
  )
};

