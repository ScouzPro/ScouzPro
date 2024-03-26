import { Routes } from '@angular/router';
import { PlayersComponent } from './pages/players/players.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { AuthComponent } from './pages/auth/auth.component';
import { HeroLandingComponent } from './components/hero-landing/hero-landing.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthRegComponent } from './pages/auth-reg/auth-reg.component';
import { DetailComponent } from './pages/detail/detail.component';
import { NewReportComponent } from './pages/new-report/new-report.component';
import { GraphComponent } from './pages/graph/graph.component';
import { blockPage } from './guards/loginBlock';





export const routes: Routes = [
    {
        path: '',
        component: HeroLandingComponent,
        
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate : [blockPage]
    },
    {
        path: 'login',
        component: AuthComponent //autentificacion del login
    },
    {
        path: 'register',
        component: AuthRegComponent //auth registro
    },
    {
        path: 'players',
        component: PlayersComponent,
        canActivate : [blockPage]
    },
    {
        path: 'reports',
        component: ReportsComponent,
        canActivate : [blockPage]
    },
    {
        path: 'player/:id',
        component: DetailComponent,
        canActivate : [blockPage]
    },
    {
    path: 'players/:id',
    component: NewReportComponent,
    canActivate : [blockPage]
    },
    {
     path: 'graph',
     component: GraphComponent,
     canActivate : [blockPage]
    },

];

