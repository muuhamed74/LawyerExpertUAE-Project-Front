import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './core/guard/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './core/pages/register/register.component';
import { authGuard2 } from './shared/guard/auth.guard';
import { LoginComponent } from './core/pages/login/login.component';
import { ForgetPasswordComponent } from './core/pages/forget-password/forget-password.component';
import { TemplatesComponent } from './pages/templates/templates.component';
import { SavedContractsComponent } from './pages/saved-contracts/saved-contracts.component';
import { ContractEditorComponent } from './pages/contract-editor/contract-editor.component';
import { Articale1Component } from './pages/articale-1/articale-1.component';
import { VerifyComponent } from './core/pages/verify/verify.component';

export const routes: Routes = [
    { path: '', redirectTo: "home", pathMatch: "full" },
    { path: 'home', component: HomeComponent },
    { path: "notFound", component: NotFoundComponent },
    { path: "templates", component: TemplatesComponent },
    { path: "articale-1", component: Articale1Component },
    { path: 'contract-editor', component: ContractEditorComponent, canActivate: [authGuard] },
    { path: "savedContracts", component: SavedContractsComponent, },
    { path: "register", component: RegisterComponent },
    { path: "verify", component: VerifyComponent},
    { path: "login", component: LoginComponent  },
    { path: "forgetpass", component: ForgetPasswordComponent},


    { path: "**", component: NotFoundComponent },
];
